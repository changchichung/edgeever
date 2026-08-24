# EdgeEver 插件開發（P0 預覽版）

EdgeEver P0 擴展 API 支持受信任的客戶端插件和無代碼主題包。用戶可以從已驗證插件市場、公開 GitHub 倉庫或 Manifest 地址安裝擴展；擴展安裝在當前設備，並且只在 EdgeEver 打開期間運行。當前預覽版不包含定時或後臺任務、Webhook、自定義編輯器 Block 和嚴格的 JavaScript 沙箱。

## 安全模型

主題包只包含經過校驗的 Manifest 和公開 Design Tokens，不執行 JavaScript。

客戶端插件採用類似 Obsidian 的受信任代碼模型。插件聲明的權限會限制它通過 EdgeEver 插件上下文調用的 API，但插件模塊本身仍運行在客戶端 JavaScript 環境中。用戶只能安裝來自可信開發者的插件。

公開 API 不會向插件暴露 EdgeEver Repository、IndexedDB 數據庫、Cloudflare Binding 或 React 內部狀態。

## 插件 Manifest

```json
{
  "type": "plugin",
  "id": "com.example.recent-notes",
  "name": "Recent Notes",
  "version": "1.0.0",
  "apiVersion": "1",
  "description": "Adds a command for recent notes.",
  "entry": "./main.js",
  "platforms": ["web", "desktop"],
  "permissions": ["notes:read", "editor:read", "ui:commands", "ui:notices", "ui:panels"]
}
```

Manifest 和 JavaScript 模塊必須返回允許 EdgeEver 來源訪問的 CORS 響應頭。相對 `entry` 地址基於 Manifest 地址解析。

## 通過 GitHub 分發

開發者可以把公開 GitHub 倉庫地址直接分享給用戶。倉庫默認分支根目錄必須包含最新的 `manifest.json`，每個版本通過 GitHub Release 發佈。Release Tag 使用 Manifest 中的版本號或帶 `v` 前綴的版本號，例如 `1.2.0` 或 `v1.2.0`。

Release 必須上傳以下資產：

```text
manifest.json
main.js
styles.css（可選）
```

GitHub 插件的 `entry` 固定爲 `./main.js`，`main.js` 必須是無需相對模塊導入的單文件 Bundle。EdgeEver 會讀取默認分支 Manifest、查找相同版本的 Release、並行下載資產、驗證 GitHub 提供的 SHA-256 Digest（如果存在），然後把驗證後的包緩存到當前設備的 IndexedDB。`main.js` 上限爲 5 MB，`styles.css` 上限爲 1 MB。

EdgeEver 會在插件市場頁面打開、窗口重新獲得焦點及每 30 分鐘檢查一次更新，但不會靜默安裝。用戶必須點擊「更新」並確認；如果新版新增插件權限或網絡域名，確認框會明確列出新增訪問範圍。GitHub 分發的 Release `manifest.json` 必須與默認分支中用於提示更新的 Manifest 完全一致，否則安裝會被拒絕。市場安裝只跟隨 Registry 中已經驗證的新版本。

用戶在獨立的「插件市場」頁面中粘貼以下地址即可自由安裝，無需經過官方市場收錄：

```text
https://github.com/owner/edgeever-plugin
```

目前僅支持公開 GitHub 倉庫；私有倉庫 Token 尚未開放。

## 已驗證插件市場

插件市場是一個經過校驗的 Registry，不接管插件所有權。Registry 爲每個版本固定插件 ID、GitHub 倉庫、版本號及 `manifest.json`/`main.js`/`styles.css` 的 SHA-256；安裝時仍從開發者的 GitHub Release 或登記的公開地址下載，並再次覈對校驗和。

Registry 格式：

```json
{
  "registryVersion": "1",
  "updatedAt": "2026-08-16T00:00:00.000Z",
  "entries": [{
    "id": "com.example.recent-notes",
    "name": "Recent Notes",
    "description": "Shows recently updated notes.",
    "author": "Example",
    "category": "Productivity",
    "repositoryUrl": "https://github.com/example/edgeever-recent-notes",
    "distribution": {
      "type": "github",
      "repositoryUrl": "https://github.com/example/edgeever-recent-notes"
    },
    "verification": {
      "version": "1.0.0",
      "checksums": {
        "manifestJson": "<64 位 SHA-256>",
        "mainJs": "<64 位 SHA-256>"
      }
    }
  }]
}
```

市場安裝顯示“已驗證”，GitHub 或 Manifest 自由安裝會明確顯示未經驗證的來源，但 EdgeEver 不阻止用戶安裝。卸載插件時會同時刪除本機緩存的插件包。

當前支持以下權限：

- `notes:read`
- `notes:write`
- `notes:delete`
- `metadata:read`
- `metadata:write`
- `network`
- `storage`
- `secrets`
- `editor:read`
- `editor:write`
- `ui:commands`
- `ui:notices`
- `ui:panels`

通過 `context.network.fetch()` 訪問網絡時，還必須在 Manifest 的 `networkHosts` 中聲明目標域名。

## 插件入口

```js
export default {
  activate(context) {
    return context.commands.register({
      id: "count-recent-notes",
      title: "Count recent notes",
      async run() {
        const result = await context.notes.query({
          sort: "updated-desc",
          limit: 10
        });
        context.ui.showNotice(`${result.notes.length} recent notes`);
      }
    });
  }
};
```

TypeScript 項目可以從 `@edgeever/plugin-api` 導入類型與輔助函數：

```ts
import { definePlugin } from "@edgeever/plugin-api";

export default definePlugin({
  activate(context) {
    // 在這裏註冊命令和事件監聽器。
  }
});
```

每次註冊都會返回清理函數。插件停用時，宿主也會自動清理已註冊的命令和事件。

## 筆記 API

```ts
context.notes.query({ text, notebookId, tags, sort, limit, offset });
context.notes.get(noteId);
context.notes.create({ notebookId, title, contentMarkdown, tags });
context.notes.update(noteId, { title, contentMarkdown, tags });
context.notes.delete(noteId, { permanent: false });
context.notebooks.list();
context.tags.list();
context.tags.rename("old", "new");
context.tags.delete("unused");
```

所有寫入都經過 EdgeEver 的共享 Repository 和業務層，包括離線隊列與桌面端適配器。插件不能直接訪問具體存儲實現。
讀取筆記本和標籤需要 `metadata:read`，修改標籤需要 `metadata:write`。

## 插件存儲與網絡

插件存儲按照 EdgeEver 工作區和插件 ID 隔離：

```ts
await context.storage.set("cursor", "next-page");
const cursor = await context.storage.get<string>("cursor");
```

網絡請求只能使用 HTTPS；本地開發允許 localhost HTTP，並且目標域名必須提前聲明：

```json
{
  "permissions": ["network"],
  "networkHosts": ["api.example.com", "*.trusted.example.com"]
}
```

```ts
await context.network.fetch("https://api.example.com/items");
```

普通 `storage` 適合游標和偏好設置。API Key 等敏感字符串應使用 `secrets`：

```ts
await context.secrets.set("api-token", token);
const token = await context.secrets.get("api-token");
await context.secrets.remove("api-token");
```

Web 端按照工作區和插件 ID 隔離 Secret，並使用設備本地、不可導出的 WebCrypto 密鑰進行 AES-GCM 加密，密文保存在 IndexedDB。它可以避免密鑰以明文形式落盤，但由於 P0 插件是同頁面受信任代碼，不能防禦惡意插件讀取運行中的數據。

## 編輯器選區 API

`editor:read` 可以讀取當前編輯器選區，`editor:write` 可以替換選區或在光標處插入 Markdown：

```ts
const selection = await context.editor.getSelection();
if (selection && !selection.empty) {
  await context.editor.replaceSelection(selection.text.toUpperCase());
}
await context.editor.insertAtCursor("**Inserted by plugin**");
```

沒有打開可編輯筆記時，讀取返回 `null`，寫入會拋出錯誤。插件修改會進入正常的編輯器事務和自動保存流程。

## 自定義面板

插件可以註冊框架無關的 DOM 面板。用戶從「插件市場」的已安裝插件區域打開面板，關閉、停用或卸載插件時宿主會執行清理函數：

```ts
context.ui.panels.register({
  id: "dashboard",
  title: "Dashboard",
  mount(container) {
    const heading = document.createElement("h2");
    heading.textContent = "Plugin dashboard";
    container.append(heading);
    return () => heading.remove();
  }
});
```

## 桌面端插件入口

啓用插件後，桌面端編輯器和個人中心右上角會顯示統一的拼圖入口。菜單按插件分組展示命令和麪板，並在頂部保留最近使用的操作；“管理插件與主題”會直接打開獨立插件市場頁面。插件不會各自在工具欄佔用一個圖標。

## 主題 Manifest

主題是一種不包含代碼的擴展包：

```json
{
  "type": "theme",
  "id": "com.example.theme",
  "name": "Example Theme",
  "version": "1.0.0",
  "themeApiVersion": "1",
  "modes": ["light", "dark"],
  "light": {
    "color.background": "#f8fafc",
    "color.surface": "#ffffff",
    "color.text": "#0f172a",
    "color.accent": "#16a06e"
  },
  "dark": {
    "color.background": "#0f172a",
    "color.surface": "#1e293b",
    "color.text": "#f8fafc",
    "color.accent": "#4ade80"
  }
}
```

`@edgeever/plugin-api` 會通過 `THEME_TOKEN_NAMES` 導出所有支持的 Token。未知 Token 會被拒絕，避免主題依賴私有 DOM 選擇器。
顏色 Token 只接受 `#RRGGBB` 或 `#RRGGBBAA`，字體與尺寸 Token 同樣使用受限格式。主題值不能包含選擇器、遠程資源或 CSS 函數。

## 倉庫內示例

本地開發 EdgeEver 時，可以在獨立的「插件市場」頁面中安裝：

- `/extensions/recent-notes/manifest.json`
- `/extensions/nord-emerald/manifest.json`

第一個示例演示筆記查詢、選區替換、命令和自定義面板，第二個示例演示無代碼主題 Token API。

## 當前限制

- 插件只安裝在當前設備，不參與同步。
- 插件只在應用打開期間運行。
- 暫無 Cron、Webhook 接收端、後臺運行環境、市場投稿後臺和自動審覈流水線。
- 權限聲明屬於 API 能力檢查，不是針對受信任 JavaScript 的嚴格沙箱。
- 自定義面板可以從桌面端統一插件菜單或插件管理頁打開，尚未支持固定到主導航或編輯器側欄。
- Secret Storage 僅保存在當前設備，不會同步到其他設備。
