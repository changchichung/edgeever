---
draft: false
title: "從印象筆記遷移到 EdgeEver 指南"
snippet: "通過 EdgeEver MCP、evernote-backup 和 ENEX 導入腳本，把你擁有的筆記資料遷移到自託管實例。"
image: {
    src: "/images/evernote-migration.jpg",
    alt: "從印象筆記遷移到 EdgeEver"
}
publishDate: "2026-07-02 01:00"
category: "Migration"
author: "EdgeEver Team"
tags: [evernote, migration, self-hosted, mcp]
---

> EdgeEver 與印象筆記、Evernote 無關聯。本指南僅用於說明用戶如何將自己擁有的數據遷移到 EdgeEver。印象筆記和 Evernote 是其各自權利人的商標。

我們推薦使用 AI 編程助手（如 Antigravity、Claude Code、Cursor 等）自動執行遷移。核心倉庫遷移指南說明：該方案已完成內存流式優化與空文本預處理，能應對數 GB 級別超大筆記庫，並保留創建/修改時間與嵌套筆記本目錄層級。

---

### 步驟 1：配置並安裝 EdgeEver MCP 服務

1. 點擊網頁端左下角的 **設置（Settings）** 圖標。
2. 在 **API & MCP 授權** 卡片生成 Token 後，點擊 **複製完整 MCP 配置** 按鈕。
3. 把複製的 JSON 配置直接發送給你的 AI 編程助手，讓它幫你配置到當前 AI 客戶端中：

```text
你是 AI 編程助手。這是我的 EdgeEver MCP 服務配置 JSON。請幫我把這個 MCP 服務直接配置到我當前使用的 AI 編輯器/客戶端（如 Claude Code, Cursor, Cline 等）的 MCP 服務器配置文件中：

<在此處粘貼剛纔複製的 JSON 配置內容>
```

---

### 步驟 2：使用 AI 助手拉取並導入筆記

當 AI 助手配置好 MCP 後，複製以下 Prompt 發送給它，讓它自動拉取印象筆記數據並導入：

```text
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

> 手動模式備用：如果不使用 AI 助手，也可以前往 GitHub 倉庫 [EdgeEver GitHub](https://github.com/tianma-if/edgeever) 下載 `scripts/import-evernote-enex-via-mcp.mjs` 腳本，並按腳本頭部註釋執行。

---

### 步驟 3：在網頁端驗證導入結果

1. 導入完成後，回到 EdgeEver 網頁端並刷新頁面。
2. 檢查左側欄，確認印象筆記原有的「筆記本組（堆疊）」層級結構已還原。
3. 打開幾篇包含多張圖片的筆記，驗證其中的圖片是否已成功在編輯器中加載並能清晰顯示。
