# Notion 筆記極簡遷移指引

[簡體中文](notion-migration-guide.md) | [English](notion-migration-guide.en-US.md)

得益於 EdgeEver 對 AI Agent 和 Model Context Protocol (MCP) 的原生支持，如果你想將 Notion 筆記庫搬遷到 EdgeEver，最優雅的方式是利用 AI 助手作爲數據橋樑，同時掛載 **Notion MCP** 和 **EdgeEver MCP** 服務，實現全自動的雲對雲筆記導入。

---

### 遷移步驟

#### 步驟 1：在 AI 助手中安裝並啓用兩個 MCP 服務

1. **配置 Notion MCP 服務**：
   在你的 AI 助手（如 Claude Code/Cursor/Cline 等）中配置好 Notion MCP 服務。配置成功後，AI 助手將獲得直接讀取你 Notion 頁面（Pages）和數據庫（Databases）的授權。
   
2. **配置 EdgeEver MCP 服務**：
   - 登錄你的 EdgeEver 實例，點擊左下角的 **個人中心** -> **MCP 設置**。
   - 生成 API Token 並點擊 **複製完整 MCP 配置**，安裝到你的 AI 助手中。

確保你的 AI 助手在運行中能夠同時調用這兩個 MCP 服務。

#### 步驟 2：對 AI 助手下達遷移指令

複製以下 Prompt 發送給已經掛載好兩個 MCP 的 AI 助手：

```text
你是我的 AI 助手。現在你同時連接了我的 Notion MCP 服務和新 EdgeEver MCP 服務。
請幫我把舊 Notion 裏的筆記和數據庫頁面遷移到新 EdgeEver 中：
1. 首先調用 Notion MCP 的讀取接口，分批次讀出我的 Notion 頁面內容（包括標題、正文、創建時間、標籤等）。
2. 然後調用 EdgeEver MCP 的寫入接口，將這些讀取到的頁面批量導入到我的 EdgeEver 實例中。
請在全量遷移完成後，告訴我總共成功同步導入了多少篇筆記，以及是否有格式轉換失敗的頁面。
```

AI 助手將自動解析並轉換 Notion 的 Block 格式，並調用 EdgeEver 接口完成無痛數據寫入。

#### 步驟 3：在網頁端驗證
回到 EdgeEver 網頁端刷新，確認所有的 Notion 頁面已成功轉入，筆記內容和排版也都已完美同步。
