# 印象筆記（Evernote）極簡遷移指引

[簡體中文](evernote-migration-guide.md) | [English](evernote-migration-guide.en-US.md)

我們強烈推薦使用 AI 編程助手（如 Codex、Antigravity、Claude Code、Cursor、OpenClaw、Hermes Agent 等）自動執行遷移。該方案已完成內存流式優化與空文本預處理，能安全應對數 GB 級別超大筆記庫，完整保留創建/修改時間與嵌套筆記本目錄層級。

---

### 步驟 1：配置並安裝 EdgeEver MCP 服務

1. 點擊網頁端左下角的 **設置（Settings）** 圖標。
2. 在 **API & MCP 授權** 卡片生成 Token 後，點擊 **複製完整 MCP 配置** 按鈕。
3. 把複製的 JSON 配置直接粘貼發送給你的 AI 編程助手（如 Codex, Antigravity, Claude Code, Cursor, OpenClaw, Hermes Agent 等），讓它幫你自動在當前的 AI 客戶端中安裝配置好該 MCP 服務：

```sh
你是 AI 編程助手。這是我的 EdgeEver MCP 服務配置 JSON。請幫我把這個 MCP 服務直接配置到我當前使用的 AI 編輯器/客戶端（如 Codex, Claude Code, Cursor, Cline 等）的 MCP 服務器配置文件中：

<在此處粘貼剛纔複製 of JSON 配置內容>
```

---

### 步驟 2：讓 AI 助手自動導入和遷移筆記

當 AI 助手配置好 MCP 之後，請複製以下 Prompt 發送給它，讓它全自動拉取印象筆記數據並導入：

```sh
你是 AI 編程助手。請幫我把本地的印象筆記全量遷移到我當前部署的 EdgeEver 實例中：
1. 檢查並使用 `pipx install evernote-backup` 自動安裝備份工具。
2. 提示我輸入印象筆記的用戶名和密碼並初始化數據庫（指定 china 後端），隨後同步數據並導出到 `./evernote-export` 目錄。
3. 從 GitHub 下載最新版遷移腳本：`https://raw.githubusercontent.com/tianma-if/edgeever/main/scripts/import-evernote-enex-via-mcp.mjs` 到本地。
4. 安裝腳本所需的本地圖片壓縮庫 `sharp` 和 `fast-xml-parser` 依賴。
5. 使用先前配置的 URL 和 Token 運行該腳本完成遷移（腳本會自動進行 WebP 圖片轉換）：
   - 全量遷移：`bun import-evernote-enex-via-mcp.mjs --input "./evernote-export" --yes`
   - 指定遷移某些筆記本：追加 `--include "筆記本A,筆記本B"` 參數。

請告訴我你需要什麼信息（如賬號密碼），收到後直接併發自動執行上述步驟。
```

> 💡 **手動模式備用**：如果您不使用 AI 助手，也可以手動前往 GitHub 倉庫 [EdgeEver GitHub](https://github.com/tianma-if/edgeever) 下載 \`scripts/import-evernote-enex-via-mcp.mjs\` 腳本並按其頭部註釋執行。

---

### 步驟 3：在網頁端驗證結果

1. 導入完成後，回到 EdgeEver 網頁端刷新頁面。
2. 檢查左側欄，確認印象筆記原有的「筆記本組（堆疊）」層級結構已完美還原。
3. 打開幾篇包含多張圖片的筆記，驗證其中的圖片是否已成功在編輯器中加載並能清晰顯示。
