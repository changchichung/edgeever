# 💡 掘金推廣文章推薦標題（三選一）

1. **🔥 0 元自建！我用 Cloudflare 免費額度做了一個“印象筆記”替代品，原生支持 AI 自動整理！**
2. **別交服務器月租了！用 Cloudflare Serverless 架構，0 成本白嫖終身免費的個人知識庫**
3. **這纔是 AI 時代的開源筆記！經典三欄佈局 + 零服務器託管，讓 Claude 幫你打理知識庫**

## 📝 掘金文章編輯摘要（三選一，限100字內）

* **第 1 版（最推薦，突出無服務器與AI）**：
  > 0元免服務器！用Cloudflare免費級配額自部署開源三欄筆記EdgeEver，無VPS月租與運維心智負擔。原生支持AI Agent (MCP)，讓Claude/GPT幫你管理知識庫，體驗終身免費的個人大腦！
* **第 2 版（側重開發者極客風）**：
  > 爲AI時代打造的開源筆記EdgeEver！保留經典三欄體驗，基於Cloudflare Serverless架構實現日常零費用自託管。內置MCP，AI助手可原生讀取整理筆記，0成本構建個人專屬的智能知識庫。
* **第 3 版（側重產品替代/告別限制）**：
  > 告別收費限制與高昂自建成本！開源筆記EdgeEver完美保留經典印象筆記三欄體驗，跑在Cloudflare免費額度上，終身無需服務器與運維。支持AI Agent原生連接，助你搭建免費的第二大腦。

---

# 正文內容

## 引言：當你的個人知識庫被“綁架”

作爲一名重度筆記用戶，不知道你是否也經歷過這些痛點：

* **傳統筆記軟件越來越臃腫**：某象筆記開機卡頓、廣告漫天，甚至開始限制多設備登錄；
* **自建筆記成本高昂**：想用 Docker 自建個 Memos 或 Wiki，每個月還得給雲服務器（VPS）交 **3~5美刀** 的服務器月租，還要配置證書、防 DDOS、維護容器，心智負擔拉滿；
* **數據封閉，難以遷移**：筆記被鎖死在特定格式裏，想導出來比登天還難；
* **對 AI 極度不友好**：不支持 MCP，AI 助手（如 Claude Code, Cursor 等）根本無法讀取和整理你的本地筆記。

如果你也深受折磨，那麼是時候瞭解一下 **EdgeEver** 了。

---

## 🚀 什麼是 EdgeEver？

**EdgeEver** 是一個**開源、自託管、Cloudflare-native（無服務器架構）**的現代筆記工作區。它不僅完美保留了經典印象筆記的“三欄體驗”，更是一款真正**爲 AI 時代設計的個人知識庫**。

最重要的是：**它自部署不需要你購買任何服務器，日常使用完全免費！**

* **GitHub 倉庫**：[tianma-if/edgeever](https://github.com/tianma-if/edgeever)
* **在線 Demo**：[https://demo.edgeever.org](https://demo.edgeever.org)

---

## 💎 核心亮點：爲什麼它與衆不同？

### 1. 終身免服務器，100% 免費（白嫖 Cloudflare 邊緣計算紅利）

傳統的自部署項目離不開 VPS 虛擬主機，而 EdgeEver 另闢蹊徑，採用了純 **Serverless（無服務器）** 架構。

它完全運行在 **Cloudflare Workers + D1 (SQLite) + R2 (對象存儲)** 上：
* **不需要購買任何雲服務器**，省去每月的租金；
* **不需要折騰複雜的 Docker、Nginx 或 SSL 證書**，Cloudflare 幫你搞定一切；
* **白嫖 Cloudflare 的免費配額**：
  * **D1 數據庫**：每天讀寫額度極高，足夠存放 **15 萬條** 短筆記；
  * **R2 對象存儲**：提供 10GB 免費存儲空間，按圖片平均 200KB 算，可存放 **5 萬張** 筆記配圖。
  
> 💡 *提示*：EdgeEver 還內置了前端圖片本地壓縮機制，截圖上傳前自動轉爲 WebP 並限制分辨率，體積減少 50%~90%，進一步榨乾免費額度！

### 2. 完美復刻“三欄式”工作流

很多輕量化筆記產品爲了簡潔砍掉了經典的佈局。而 EdgeEver 堅持保留了最符合人類知識整理直覺的**三欄設計**：

* **左欄**：無限級嵌套的筆記本樹，支持鼠標拖拽排序與層級調整；
* **中欄**：筆記列表，支持多選批量移動、批量合併；
* **右欄**：富文本編輯區，基於 TipTap 深度定製，支持 Markdown 快捷輸入，並原生支持**查看歷史版本**，隨時可以回溯。
* **多端適配**：完美適配 PC 與移動端，支持安裝爲 **PWA** 應用，像原生 App 一樣啓動。

### 3. AI Agent 原生連接器（Remote MCP）

這不僅是一個人寫的筆記，更是你和 AI 助手協同的“大腦”。

EdgeEver 內置了 **REST API**、**OpenAPI 協議** 以及 **Remote MCP (Model Context Protocol) Endpoint**：
1. 在 EdgeEver 個人中心生成一個 MCP Token；
2. 填入你的 AI 助手（如 Codex、Claude Code、Antigravity、Cursor 等）；
3. **授權 AI 直接讀取、整理和維護你的筆記庫**。

**💡 玩法放飛腦洞：**
* 吩咐 Claude Code：“幫我把最近隨手記下的散亂想法歸納成一篇技術博客大綱”；
* 讓 AI 分析你過去幾個月的學習筆記，精細化構建你的知識圖譜；
* 批量爲沒有分類的筆記自動打上標籤。

---

## 🛠 部署指南：如何一鍵“白嫖”？

EdgeEver 的部署簡單到了極致，甚至你都不需要打開終端。

### 方式 A：AI Agent 一句話部署（推薦）

將下面這段提示詞複製給已配置 GitHub、Cloudflare MCP、插件或其他可用集成的 AI Agent：

```text
請在線完成 EdgeEver 部署：
1. Fork https://github.com/tianma-if/edgeever。
2. 將這個 Fork 導入 Cloudflare Workers & Pages。
3. 嚴格按照 docs/agent-deploy-cloudflare.zh-CN.md 配置 D1、R2、EDGE_EVER_AUTH_PASSWORD Worker Secret 和 Workers Builds。
4. 啓動首次構建，驗證健康檢查和登錄，然後手動運行一次 Update deployed EdgeEver。
```

### 方式 B：Fork 後在線部署

先 Fork EdgeEver 上游倉庫，然後在 Cloudflare Workers & Pages 中導入自己的 Fork，在線配置 D1、R2、Worker Secret 和構建命令。部署完成後，啓用倉庫中的上游更新工作流，後續版本會自動同步、驗證並部署。

在 GitHub Fork EdgeEver 後，參考[在線部署文檔](../deploy-cloudflare-button.zh-CN.md)完成配置。

高級恢復時才需要手動運行部署命令：

```sh
# 1. 複製環境變量
cp .env.local.example .env.local

# 2. 安裝依賴並自動初始化資源
bun install
EDGE_EVER_PASSWORD='你的後臺登錄密碼' bun run deploy:setup

# 3. 環境自檢並部署
bun run deploy:doctor
bun run deploy:manual
```

部署完成後，終端會直接輸出你的獨立訪問域名，點開即可使用！

---

## ⚖️ 自建方案大比拼

| 特性 | 傳統自建筆記 (如 Docker 部署) | 商業雲筆記 (如 Notion / 某象) | **EdgeEver 自託管** |
| :--- | :--- | :--- | :--- |
| **服務器成本** | 💰 需購買 VPS (3~5美刀/月) | 🆓 免費但受限 / 需高額訂閱 | **🎉 0 元 (跑在 Cloudflare 免費額度)** |
| **運維難度** | 🛠 需維護 Docker/網絡/SSL/安全漏洞 | 0 運維 | **0 運維 (Cloudflare 全託管託管)** |
| **數據隱私** | 🔒 極高 (存在自己服務器) | ⚠️ 存在第三方雲端，有倒閉/掃描風險 | **🔒 極高 (存在自己的 Cloudflare 賬號中)** |
| **AI 協同** | ❌ 很難對接 AI 客戶端 | ⚠️ 需購買官方高昂的 AI 增值服務 | **✅ 原生 Remote MCP，免費對接各類 Agent** |

---

## 💬 結語

EdgeEver 的誕生，是爲了讓每個開發者都能低門檻、無成本地擁有一個真正屬於自己的、安全的、且面向 AI 時代的知識庫。

如果你覺得這個項目對你有幫助，歡迎來 GitHub 點個 **Star** 支持一下！

* **GitHub 倉庫**：👉 [tianma-if/edgeever](https://github.com/tianma-if/edgeever)
* **Demo 試用**：👉 [demo.edgeever.org](https://demo.edgeever.org)
