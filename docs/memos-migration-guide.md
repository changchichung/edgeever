# Memos 筆記極簡遷移指引

[簡體中文](memos-migration-guide.md) | [English](memos-migration-guide.en-US.md)

由於 EdgeEver 原生支持 AI Agent (Model Context Protocol, MCP) 接入，你甚至不需要導出任何數據文件，可以直接利用 AI 助手作爲橋樑，同時掛載 **Memos MCP** 和 **EdgeEver MCP** 兩個服務，實現全自動的雲對雲筆記搬家。

---

### 遷移步驟

#### 步驟 1：在 AI 助手中安裝並啓用兩個 MCP 服務

1. **配置 Memos MCP 服務**：
   將你的舊 Memos 實例的 MCP 服務（可以使用 Memos 官方或社區提供的 MCP 插件）配置到你的 AI 助手（如 Claude Code/Cursor 等）中。
   
2. **配置 EdgeEver MCP 服務**：
   - 登錄你的 EdgeEver 實例，點擊左下角的 **個人中心** -> **MCP 設置**。
   - 生成 API Token 並點擊 **複製完整 MCP 配置**。
   - 將此配置粘貼發送並安裝到你的 AI 助手中。

確保你的 AI 助手在運行中能夠同時訪問並調用這兩個 MCP 服務。

#### 步驟 2：給 AI 助手發送指令開始搬家

複製以下 Prompt 直接發送給已經掛載好兩個 MCP 的 AI 助手：

```text
你是我的 AI 助手。現在你同時連接了我的舊 Memos MCP 服務和新 EdgeEver MCP 服務。
請幫我把舊 Memos 裏的所有筆記遷移到新 EdgeEver 中：
1. 首先調用 Memos MCP 的讀取/獲取接口，分批次讀取出我所有的舊 Memos 筆記（包含文本、創建時間、標籤等信息）。
2. 然後調用 EdgeEver MCP 的創建/寫入接口，將這些讀取到的筆記批量寫入到我的 EdgeEver 實例中。
請在全量遷移完成後，告訴我總共成功同步導入了多少條筆記。
```

AI 助手將全自動調用 Memos 接口讀取數據，並同時調用 EdgeEver 接口寫入，實現全自動的“雙 MCP 數據橋接”遷移。

#### 步驟 3：在網頁端驗證
回到 EdgeEver 網頁端刷新，確認所有的 Memos 筆記已成功錄入，時間戳和標籤也都已完美同步。
