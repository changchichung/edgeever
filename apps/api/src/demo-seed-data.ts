import {
  decodeDemoAttachment,
  DEMO_ATTACHMENT_MARKDOWN_EN,
  DEMO_ATTACHMENT_MARKDOWN_ZH,
  DEMO_ATTACHMENT_RESOURCES,
} from "./demo-attachments";

export { decodeDemoAttachment };

export const DEMO_SEED_NOTEBOOKS = [
  { id: "nb_inbox", parentId: null, name: "等待分類", slug: "inbox", icon: "notebook", color: "#0f766e", sortOrder: 10 },
  { id: "nb_projects", parentId: null, name: "工作項目", slug: "work-projects", icon: "notebook", color: "#2563eb", sortOrder: 20 },
  { id: "nb_learning", parentId: null, name: "學習資料", slug: "learning-resources", icon: "notebook", color: "#7c3aed", sortOrder: 30 },
  { id: "nb_creative", parentId: null, name: "靈感創作", slug: "creative-ideas", icon: "notebook", color: "#db2777", sortOrder: 40 },
  { id: "nb_personal", parentId: null, name: "生活個人", slug: "personal-life", icon: "notebook", color: "#ea580c", sortOrder: 50 },
  { id: "nb_demo_features", parentId: "nb_projects", name: "功能演示", slug: "demo-features", icon: "notebook", color: "#0891b2", sortOrder: 21 },
  { id: "nb_demo_features_en", parentId: "nb_projects", name: "Feature Demos", slug: "feature-demos", icon: "notebook", color: "#0e7490", sortOrder: 22 },
];

export const DEMO_SEED_MEMOS_ZH = [
  {
    id: "memo_demo_overview",
    notebookId: "nb_demo_features",
    title: "🌿 歡迎使用 EdgeEver：爲極客與創作者打造的現代開源知識庫",
    tags: ["overview", "guide", "features", "ai-agent"],
    isPinned: true,
    markdown:
      `> **EdgeEver** 是一款兼具**經典三欄美學**與 **AI 原生動力**的開源 Serverless / 容器化個人知識庫。它既找回了極客們鍾愛的經典印象筆記式雙視圖與樹狀目錄，又以零服務器成本、完全數據自主、全端原生覆蓋與深度 MCP 智能體協同，重新定義了下一代個人第二大腦。

---

## ⚡ 1. 爲什麼選擇 EdgeEver？

*提示：在編輯器模式下，你可以直接點擊任意表格單元格進行行內編輯，或右鍵快捷插入/刪除行列。*

| 核心維度 | 傳統商業雲筆記 (如 Evernote) | 本地離線知識庫 (如 Obsidian) | EdgeEver 極客知識庫 |
| :--- | :--- | :--- | :--- |
| **雲端託管成本** | 商業訂閱高昂（$10+/月） | 官方雲同步收費（$5+/月） | **100% 永久免費 (Cloudflare 免費額度 / Docker 自建)** |
| **數據資產所有權** | 專有格式封閉，導出困難 | 本地 Markdown，移動端同步繁瑣 | **完全自主掌控 (D1 SQLite 數據庫 / R2 / 無損 ZIP 導出)** |
| **寫作與編輯體驗** | 僅富文本，排版易錯亂 | 純 Markdown，缺乏沉浸所見即所得 | **雙視圖自由切換 (所見即所得富文本 ⇄ Markdown 源碼)** |
| **自媒體排版分發** | 無樣式優化，格式丟失 | 需藉助外部排版擴展或工具 | **一鍵複製到微信公衆號 / Substack / Medium / WordPress** |
| **社交卡片分享** | 截圖粗糙或無排版設計 | 需第三方插件實現 | **內置 8 款精美海報主題，支持自定義字體與 PNG/JPEG 導出** |
| **AI 原生集成生態** | 封閉收費，僅限特定功能 | 需配置複雜的第三方插件 | **原生內置 MCP 服務端點 (\`/mcp\`) 與行內 AI 智能體協同** |
| **全平臺多端覆蓋** | 限制免費設備登錄數量 | 多端同步與移動端體驗門檻高 | **Web / PWA / Android / iOS / macOS / Windows (即將推出)** |

---

## 🏗️ 2. 全景架構與生態聯動

通過下面的 Mermaid 架構圖，你可以清晰瞭解 EdgeEver 如何將多端客戶端、零成本雲基礎設施與 AI Agent 緊密串聯：

\`\`\`mermaid
flowchart TD
    subgraph MultiClients["全端客戶端矩陣"]
        C1["Web / PWA (離線草稿 & 增量同步)"]
        C2["macOS 桌面端 (Electron + Rust Sidecar)"]
        C3["Android 原生 App (Expo + SQLite)"]
        C4["iOS 原生 App (SwiftUI + GRDB)"]
        C5["瀏覽器剪藏插件 (Chrome / Edge / Firefox)"]
    end

    subgraph CoreEngine["業務與數據服務層"]
        API["Hono API 引擎 (Cloudflare Workers / Docker)"]
        MCP["原生 MCP Endpoint (/mcp 2026-07-28 & 2025)"]
        D1[("D1 / SQLite 數據庫 (雙向同步 & 修訂版本)")]
        R2[("R2 / S3 資源存儲 (圖片與多媒體附件)")]
    end

    subgraph AIAgents["AI 智能體與外部生態"]
        A1["Claude Code / Cursor / Antigravity"]
        A2["行內 AI 助手 (OpenAI / Gemini / DeepSeek)"]
        A3["Notion 數據庫 / 飛書多維表格聯動"]
    end

    MultiClients <==>|REST API & 同步游標| API
    API <==> D1 & R2
    MCP <==> D1 & R2
    A1 <==>|MCP Tools / SSE| MCP
    A2 -.->|BYOK 密鑰直連| MultiClients
    A1 -.->|雙向數據同步| A3
\`\`\`

---

## 🎨 3. 極致創作體驗與排版美學

EdgeEver 將高效與優雅融入每一處交互細節，助你專注于思考與表達：

### 🖥️ 雙視圖編輯器與沉浸模式
- **自由切換視圖**：點擊右上角 \`</>\` 按鈕或使用快捷鍵，可在**所見即所得富文本**與 **Markdown 源碼**間無縫切換，實時雙向保真。
- **左側可摺疊大綱**：自動解析文檔 \`H1-H3\` 標題層級，支持點擊平滑滾動跳轉，助你輕鬆把控萬字長文。
- **Zen 專注模式**：按下 \`Cmd/Ctrl + Shift + F\`，隱藏所有側邊欄與干擾元素，進入純粹寫作心流。
- **閱讀保護模式 (Reading Protection)**：日常翻閱或查閱筆記時，按下 \`Cmd/Ctrl + E\` 即可一鍵開啓只讀保護，鎖定當前編輯狀態，避免沉浸閱讀時誤觸鍵盤或意外改動筆記內容；再次按下即可隨手切回編輯。

### 🎭 精選排版主題與一鍵自媒體發佈
- **內置排版主題**：支持一鍵切換 \`WeChat Classic Green (微信經典綠)\`、\`Modern Mint (薄荷青)\`、\`Minimal Emerald (極簡祖母綠)\`、\`Outline Emerald (大綱祖母綠)\` 等風格。
- **一鍵排版複製**：專爲內容創作者設計。點擊頂部工具欄的**微信公衆號圖標**，系統自動將當前筆記轉爲內聯 CSS 樣式的優雅富文本，直接粘貼至微信公衆號後臺、Substack 或 WordPress，排版與代碼高亮完美保真。

### 🖼️ 8 套精美社交分享海報 (Poster Cards)
點擊右上角“分享爲卡片”，即可將任意筆記或片段渲染爲高清分享海報，支持：
- **8 大主題風格**：\`Slate (巖灰)\`、\`Aurora (極光青)\`、\`Sunset (落日暖橙)\`、\`Midnight (暗夜極客)\`、\`Mint (清爽薄荷)\`、\`Notepad (復古便籤)\`、\`Xuan (宣紙水墨)\`、\`Lavender (薰衣草紫)\`。
- **排版定製**：支持無襯線 (Sans)、宋體/明朝 (Serif)、等寬代碼 (Mono) 字體切換，自由選擇緊湊、標準或寬幅卡片，一鍵導出爲高清晰度 PNG 或 JPEG 圖片。

---

## ⌨️ 4. 效率工具箱：斜槓指令、雙鏈與數學公式

### 🪄 斜槓指令 (Slash Commands)
在正文空白行輸入 \`/\` 或直接按下 \`空格鍵\`，即可呼出快捷指令菜單：
- 快速插入 \`H1/H2/H3\` 標題、引用、分割線、代碼塊與富文本表格；
- 輸入 \`/date\`、\`/time\` 或 \`/now\` 快速插入當前標準時間戳；
- 插入附件、圖片或調起行內 AI 智能助手。

### 🔗 知識雙鏈與筆記引用
在編輯器中輸入 \`@\` 或插入 \`#memo=<筆記ID>\` 鏈接，即可建立筆記間的雙向關聯，點擊即可在工作區內快速打開關聯筆記，構建結構化網狀知識庫。

### 📐 KaTeX 專業數學公式渲染
EdgeEver 原生支持 LaTeX 數學表達式，無論是行內微積分還是多行物理方程，均可毫秒級高保真渲染：

- **行內公式**：例如質能方程 $E = mc^2$，以及正態分佈概率密度函數 $f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$。
- **多行獨立公式塊**：
$$
\\oint_{\\partial \\Omega} \\mathbf{E} \\cdot d\\mathbf{S} = \\frac{1}{\\varepsilon_0} \\iiint_{\\Omega} \\rho \\, dV, \\quad \\oint_{\\partial \\Omega} \\mathbf{B} \\cdot d\\mathbf{S} = 0
$$

### ✅ 交互式待辦清單 (Task Lists)
- [x] 體驗 EdgeEver 雙視圖與大綱導航
- [x] 探索 8 款編輯器主題與 8 套社交海報卡片
- [ ] 嘗試使用斜槓指令 \`/\` 插入當前日期與結構化表格
- [ ] 配置個人 AI API Key，體驗行內智能總結與續寫
- [ ] 開啓 MCP 協議，讓 AI Agent 協助整理工作區

---

## 🤖 5. AI 原生協同與 MCP 智能體生態

EdgeEver 走在 AI 時代前沿，將大語言模型與智能體深度融入知識管理生命週期：

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor User as 創作者 / 知識工作者
    participant Client as EdgeEver 多端應用
    participant MCP as EdgeEver MCP 服務端點
    participant Agent as AI Agent (Claude / Cursor / Antigravity)
    participant Database as Notion / 飛書多維表格

    User->>Client: 快速記錄碎片想法與會議靈感
    Agent->>MCP: tools/call memo_search (檢索近期未整理筆記)
    MCP-->>Agent: 返回結構化 Markdown 筆記內容與標籤
    Agent->>Agent: 理解內容、自動提煉核心摘要並歸類標籤
    Agent->>MCP: tools/call memo_update (寫回智能總結與增強標籤)
    Agent->>Database: 同步結構化字段至個人知識總庫
    Client-->>User: 客戶端毫秒級感知更新，筆記井井有條
\`\`\`

### 1️⃣ 行內 AI 助手 (Inline AI Assistant)
在正文空白行直接按下 **\`空格鍵 (Space)\`**、輸入 **\`/ai\`**、通過 **\`/\`** 斜槓指令菜單，或選中文本點擊浮動工具欄中的 **AI 按鈕**，即可即時呼出 AI 寫作助手面板：
- **精煉總結與要點提取**：一鍵壓縮提煉全文核心結論、提取待辦事項與關鍵行動項；
- **格式保真智能翻譯**：在嚴格保留原有 Markdown、數學公式、鏈接與代碼塊的前提下，精準翻譯多國語言；
- **內容重塑與風格改寫**：支持改進表達、修正錯別字與語法、轉爲社交媒體（如小紅書/推特）風格，或按上下文順滑續寫；
- **BYOK 隱私直連 (Bring Your Own Key)**：支持直連 OpenAI、Anthropic Claude、Google Gemini、DeepSeek 及各類 OpenAI 兼容的中繼 API，數據完全由端側直髮，不經過任何第三方中轉。

### 2️⃣ 開放 MCP 協議 (Model Context Protocol)
在**設置 → MCP 設置**中生成專屬令牌，即可將 EdgeEver 接入 Claude Code、Cursor、Antigravity、OpenClaw 等主流 AI 編碼助手與智能體平臺：
- **無縫讀寫**：支持標準 MCP 端點 \`/mcp\`（兼容最新的無狀態 \`2026-07-28\` 協議與經典握手協議）；
- **自動化流轉**：AI Agent 可自動讀取筆記、智能歸檔、批量打標，甚至與 Notion、飛書多維表格建立跨平臺自動化同步。

---

## 📱 6. 全平臺原生覆蓋、離線同步與智能剪藏

- **多端原生支持**：
  - **Web / PWA**：支持現代瀏覽器全功能運行與離線安裝；
  - **Android 原生客戶端**：基於 Expo 與 SQLite 構建，已上架 Google Play，並提供簽名 APK 下載；
  - **iOS 原生客戶端**：基於 Swift / SwiftUI 與 GRDB 原生實現，流暢細膩，已上架 App Store；
  - **macOS 桌面端**：Electron + Rust 高性能 Sidecar，支持 Apple Silicon 和 Intel Mac，內置靜默後臺更新；
  - **Windows 桌面端**：已開發完畢，即將正式推出。
- **瀏覽器網頁剪藏 (Web Clipper)**：已在 Chrome、Edge 和 Firefox 官方擴展商店發佈，一鍵剔除網頁廣告，將正文純淨沉澱爲 Markdown 筆記。
- **微信公衆號一鍵剪藏**：在移動端系統分享菜單中，直接將微信文章分享到 EdgeEver，客戶端將自動提取圖文排版並轉換爲可編輯筆記。
- **離線草稿與彈性同步**：地鐵、飛行模式等無網絡環境下自由編輯，重新聯網後自動入隊完成增量同步與衝突協調。

---

## 📦 7. 多媒體管理、無損備份與零成本自建

### 🖼️ 智能本地圖片壓縮
在筆記中粘貼或拖入高分辨率圖片時，前端會在本地自動將其轉碼壓縮爲 WebP 格式，在保證視覺無損的前提下**減少 50% - 90% 的體積**，大幅降低雲端存儲佔用並提升跨端加載速度。

![EdgeEver 官方 Logo](/api/v1/resources/res_demo_logo/blob)

### 📎 多類型附件自由掛載
支持在筆記中嵌入 PDF 文檔、CSV 表格、壓縮包及多媒體資源，點擊即可在線預覽或下載：
- [📄 產品白皮書 PDF：edgeever-product-brief.pdf](/api/v1/resources/res_demo_product_brief_pdf/blob)
- [📊 功能矩陣 CSV：feature-matrix.csv](/api/v1/resources/res_demo_feature_matrix_csv/blob)
- [📦 示例附件壓縮包：edgeever-attachment-demo.zip](/api/v1/resources/res_demo_attachment_bundle_zip/blob)

### 🚀 兩種自建部署方案：Serverless 與 Docker
1. **Cloudflare Serverless（推薦，永久 100% 免費）**：基於 Workers + D1 數據庫 + R2 對象存儲構建，完全處於 Cloudflare 免費額度內，無需採購服務器，免運維、免證書續期。
2. **Docker 一鍵自建（VPS / NAS / 家用服務器）**：
   \`\`\`sh
   # 國際 VPS / NAS 極速安裝（GHCR 鏡像）
   curl -fsSL https://edgeever.org/install.sh | bash

   # 大陸地區 VPS / NAS 鏡像加速（騰訊雲 TCR 鏡像）
   curl -fsSL https://edgeever-installer-1256854452.cos.ap-guangzhou.myqcloud.com/install.sh | bash -s -- --mirror tcr
   \`\`\`
   單命令自動配置 Docker Compose 環境，並內置每日定時自動更新。

### 💾 絕對的數據自由：無損 ZIP 導入與導出
在**個人中心 → 導入與導出**中，可隨時將完整筆記庫打包導出爲結構清晰的 ZIP 壓縮包。解壓後即爲包含標準 YAML Front Matter、相對路徑附件圖片與完整修訂版本的純 Markdown 文件樹，隨時可在 Obsidian、VS Code 等任意工具中無縫打開，永不擔心平臺綁定！

---

> 💡 **快速體驗小貼士**：
> 1. 點擊右上角 **\`</>\`** 體驗絲滑的雙視圖切換；
> 2. 按下 **\`Cmd/Ctrl + E\`** 試一試閱讀保護模式，鎖定只讀避免誤改內容；
> 3. 按下 **\`Cmd/Ctrl + O\`** 呼出快速切換器 (Quick Switcher)；
> 4. 點擊頂部 **微信圖標**，體驗一鍵帶格式排版複製；
> 5. 點擊 **“分享爲卡片”**，挑選一款你心儀的社交海報風格並導出；
> 6. 隨時在側邊欄或設置中點擊 **“恢復 Demo 數據”**，一鍵重置演示工作區。
`,
  },
];

export const DEMO_SEED_REVISIONS = [
  {
    id: "rev_demo_revision_1",
    memoId: "memo_demo_overview",
    revision: 1,
    title: "🌿 歡迎使用 EdgeEver：爲極客與創作者打造的現代開源知識庫",
    markdown:
      "## 🌿 歡迎使用 EdgeEver（初版草稿）\n\n- 印象筆記經典三欄與自建 Serverless\n- 可視化表格與 Markdown 源碼雙向切換\n- 原生 MCP 與 AI 智能體協同",
  },
  {
    id: "rev_demo_revision_1_en",
    memoId: "memo_demo_overview_en",
    revision: 1,
    title: "🌿 Welcome to EdgeEver: Modern Open-Source Knowledge Base for Geeks & Creators",
    markdown:
      "## 🌿 Welcome to EdgeEver (Initial Draft)\n\n- Classic Evernote 3-pane layout & Serverless self-hosted\n- Visual table editing & Markdown source toggle\n- Native MCP & AI agent synergy",
  },
];

export const DEMO_MEMO_ENGLISH = {
  memo_demo_overview: {
    title: "🌿 Welcome to EdgeEver: Modern Open-Source Knowledge Base for Geeks & Creators",
    markdown:
      `> **EdgeEver** is an open-source, AI-native, and portable serverless/containerized personal knowledge base that revives the beloved **Evernote-style three-pane layout**. Designed for geeks and content creators, it combines 100% free serverless hosting, absolute data ownership, native cross-platform clients, and seamless AI Agent (MCP) synergy to redefine your digital second brain.

---

## ⚡ 1. Why Choose EdgeEver?

*Tip: In editor mode, click any table cell to edit text directly, or right-click to insert/delete rows and columns.*

| Dimension | Traditional Cloud Notes (e.g. Evernote) | Local Offline Notes (e.g. Obsidian) | EdgeEver Geek Knowledge Base |
| :--- | :--- | :--- | :--- |
| **Hosting Cost** | Costly commercial subscriptions ($10+/mo) | Official cloud sync subscription ($5+/mo) | **100% Free Forever (Cloudflare Free Tier / Docker Self-Hosted)** |
| **Data Ownership** | Proprietary lock-in, hard to export | Local Markdown, cumbersome mobile sync | **Full Ownership (D1 SQLite, R2 Storage, Lossless ZIP Archives)** |
| **Editing Experience** | Rich text only, fragile formatting | Plain Markdown, lacks WYSIWYG flow | **Seamless Dual-View (WYSIWYG Rich Text ⇄ Markdown Source)** |
| **Publishing Ready** | No typography styling, loses format | Requires 3rd-party plugins or scripts | **One-Click Rich Copy for WeChat, Substack, Medium & WordPress** |
| **Social Poster Cards** | Basic screenshots without styling | Requires external tools or plugins | **8 Built-in Exquisite Poster Themes with Typography Options & PNG/JPEG Export** |
| **Native AI Ecosystem** | Paywalled, limited features | Heavy plugin setup required | **Native MCP Server (\`/mcp\`) & Inline AI Agent Synergy** |
| **Cross-Platform Matrix** | Restricts active free devices | Complex setup across platforms | **Web / PWA / Android / iOS / macOS / Windows (Coming Soon)** |

---

## 🏗️ 2. Architectural Overview & Ecosystem

The Mermaid diagram below demonstrates how EdgeEver connects cross-platform clients, zero-cost cloud infrastructure, and AI Agents into a cohesive workflow:

\`\`\`mermaid
flowchart TD
    subgraph MultiClients["Client Matrix"]
        C1["Web / PWA (Offline Drafts & Sync Queue)"]
        C2["macOS Desktop (Electron + Rust Sidecar)"]
        C3["Android Native App (Expo + SQLite)"]
        C4["iOS Native App (SwiftUI + GRDB)"]
        C5["Web Clipper (Chrome / Edge / Firefox)"]
    end

    subgraph CoreEngine["Service & Storage Core"]
        API["Hono API Engine (Cloudflare Workers / Docker)"]
        MCP["Native MCP Endpoint (/mcp 2026-07-28 & 2025)"]
        D1[("D1 / SQLite Database (Sync Cursor & Revisions)")]
        R2[("R2 / S3 Storage (Images & Media Attachments)")]
    end

    subgraph AIAgents["AI Agents & Integrations"]
        A1["Claude Code / Cursor / Antigravity"]
        A2["Inline AI Assistant (OpenAI / Gemini / DeepSeek)"]
        A3["Notion DB / Feishu Bitable Sync"]
    end

    MultiClients <==>|REST API & Sync Cursor| API
    API <==> D1 & R2
    MCP <==> D1 & R2
    A1 <==>|MCP Tools / SSE| MCP
    A2 -.->|BYOK Direct Key| MultiClients
    A1 -.->|Bi-directional Sync| A3
\`\`\`

---

## 🎨 3. Immersive Writing & Typography Aesthetics

EdgeEver is engineered to provide a distraction-free, elegant writing experience:

### 🖥️ Dual-View Editor & Focus Modes
- **Seamless Dual-View**: Click the \`</>\` button in the top-right corner (or use shortcuts) to instantly toggle between **WYSIWYG Rich Text** and **Markdown Source Code** with 100% fidelity.
- **Collapsible Outline Navigation**: Automatically indexes \`H1-H3\` heading hierarchies with smooth jump scrolling, keeping lengthy documents organized.
- **Zen Focus Mode**: Press \`Cmd/Ctrl + Shift + F\` to hide sidebars and distractions, immersing yourself in pure writing flow.
- **Reading Protection Mode**: When reading or reviewing notes, press \`Cmd/Ctrl + E\` to toggle read-only protection, locking the editor to prevent accidental edits while browsing; press it again to seamlessly resume editing.

### 🎭 Curated Typography Themes & Publishing Export
- **Preset Editor Themes**: Switch effortlessly between \`WeChat Classic Green\`, \`Modern Mint\`, \`Minimal Emerald\`, \`Outline Emerald\`, and more.
- **One-Click Publishing Export**: Built for publishers and bloggers. Click the **WeChat Icon** in the top bar to format your note with inline CSS. Paste directly into WeChat Official Account editor, Substack, Medium, or WordPress while preserving layout and syntax highlighting.

### 🖼️ 8 Exquisite Social Poster Themes
Click **"Share as Card"** in the top-right menu to turn any note into an eye-catching poster card:
- **8 Themes**: \`Slate\`, \`Aurora\`, \`Sunset\`, \`Midnight\`, \`Mint\`, \`Notepad\` (skeuomorphic paper), \`Xuan\` (rice paper & Chinese ink), \`Lavender\`.
- **Customizable Typography**: Switch between Sans, Serif (Songti/Ming), and Monospace fonts, select compact, standard, or wide card widths, and export as high-resolution PNG or JPEG.

---

## ⌨️ 4. Power Productivity Toolbox: Slash Commands, Backlinks & Math

### 🪄 Slash Commands
Type \`/\` or press \`Space\` on an empty line to invoke the command menu:
- Insert \`H1/H2/H3\` headings, quotes, horizontal rules, code blocks, and rich tables;
- Use \`/date\`, \`/time\`, or \`/now\` to insert current timestamps instantly;
- Attach files, insert images, or summon the inline AI assistant.

### 🔗 Bi-directional Note Links & Backlinks
Type \`@\` or insert \`#memo=<memoId>\` links to establish bi-directional references across your knowledge base, building an interconnected web of thoughts.

### 📐 KaTeX Professional LaTeX Mathematics
Native support for KaTeX renders complex mathematical equations in milliseconds:

- **Inline Math**: For instance, Einstein's mass-energy equivalence $E = mc^2$ or the Gaussian probability density function $f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$.
- **Display Block Math**:
$$
\\oint_{\\partial \\Omega} \\mathbf{E} \\cdot d\\mathbf{S} = \\frac{1}{\\varepsilon_0} \\iiint_{\\Omega} \\rho \\, dV, \\quad \\oint_{\\partial \\Omega} \\mathbf{B} \\cdot d\\mathbf{S} = 0
$$

### ✅ Interactive Task Lists
- [x] Explore EdgeEver's dual-view editing and outline navigation
- [x] Experiment with 8 editor themes and 8 social poster card styles
- [ ] Try typing \`/\` on an empty line to insert current timestamp and tables
- [ ] Connect your AI API Key to experience inline summarization and continuation
- [ ] Connect AI Agents via MCP to automate note categorization

---

## 🤖 5. Native AI Agent Synergy & MCP Protocol

EdgeEver is architected for the agentic AI era, weaving LLMs directly into the knowledge management lifecycle:

\`\`\`mermaid
sequenceDiagram
    autonumber
    actor User as Creator / Knowledge Worker
    participant Client as EdgeEver Clients
    participant MCP as EdgeEver MCP Endpoint
    participant Agent as AI Agent (Claude / Cursor / Antigravity)
    participant Database as Notion / Feishu Bitable

    User->>Client: Capture quick spark or meeting notes
    Agent->>MCP: tools/call memo_search (Query unprocessed memos)
    MCP-->>Agent: Returns structured Markdown & tags
    Agent->>Agent: Analyzes content, extracts key takeaways & tags
    Agent->>MCP: tools/call memo_update (Writes back summary & tags)
    Agent->>Database: Syncs structured records to master database
    Client-->>User: Sub-second live updates in client UI
\`\`\`

### 1️⃣ Inline AI Assistant
Press the **\`Space\` bar** in an empty block, type **\`/ai\`**, use the **\`/\`** slash command menu, or select text and click the **AI button** on the floating toolbar to instantly summon the AI writing assistant:
- **Summarization & Action Items**: Condense documents into key takeaways, conclusions, and actionable todos;
- **Format-Preserving Translation**: Translate accurately into multiple languages while strictly preserving Markdown, math equations, links, and code blocks;
- **Rewriting & Style Transformation**: Improve phrasing, fix spelling/grammar, adapt to social media styles (e.g. Xiaohongshu / Twitter), or continue writing seamlessly;
- **BYOK Direct Key (Bring Your Own Key)**: Direct client-side connection with OpenAI, Anthropic Claude, Google Gemini, DeepSeek, and OpenAI-compatible relays with zero third-party data transit.

### 2️⃣ Model Context Protocol (MCP) Integration
Generate an API token in **Settings → MCP Settings** to connect EdgeEver directly with Claude Code, Cursor, Antigravity, OpenClaw, and other agent platforms:
- **Direct Reading & Writing**: Connect via the \`/mcp\` endpoint (supports stateless \`2026-07-28\` protocol and handshake-based 2025 specs);
- **Automated Workflows**: Let AI Agents read, organize, summarize, tag, and synchronize notes with Notion databases and Feishu Bitable.

---

## 📱 6. Multi-Platform Ecosystem, Offline Sync & Smart Clipping

- **Cross-Platform Native Apps**:
  - **Web / PWA**: Full-featured in modern browsers with offline installation support;
  - **Android Native App**: Built with Expo & SQLite, available on Google Play and GitHub Releases;
  - **iOS Native App**: Native Swift / SwiftUI with GRDB local mirror, available on the App Store;
  - **macOS Desktop App**: Electron + Rust Sidecar for Apple Silicon & Intel Mac with silent background updates;
  - **Windows Desktop App**: Development is complete, coming soon.
- **Browser Web Clipper**: Available on Chrome, Edge, and Firefox extension stores to extract clean, ad-free Markdown articles in one click.
- **Mobile WeChat Article Clipper**: Share any WeChat article to EdgeEver on your phone to automatically extract and format it as an editable note.
- **Offline Drafts & Sync Queue**: Keep writing seamlessly without network connectivity; changes are queued locally and automatically synced once reconnected.

---

## 📦 7. Rich Media, Lossless Portability & Zero-Cost Hosting

### 🖼️ Smart Client-Side Image Compression
When pasting or dragging images into notes, EdgeEver compresses them to WebP locally in your browser before upload, **reducing file size by 50% - 90%** while preserving visual fidelity.

![EdgeEver Official Logo](/api/v1/resources/res_demo_logo/blob)

### 📎 Universal File Attachments
Embed PDFs, spreadsheets, archives, and multimedia files directly in notes for preview or download:
- [📄 Product brief PDF: edgeever-product-brief.pdf](/api/v1/resources/res_demo_product_brief_pdf/blob)
- [📊 Feature matrix CSV: feature-matrix.csv](/api/v1/resources/res_demo_feature_matrix_csv/blob)
- [📦 Sample attachment archive: edgeever-attachment-demo.zip](/api/v1/resources/res_demo_attachment_bundle_zip/blob)

### 🚀 Zero-Cost Serverless & Docker Self-Hosting
1. **Cloudflare Serverless (Recommended, 100% Free Forever)**: Runs entirely within Cloudflare's free tier (Workers + D1 SQLite + R2 Storage). No server bills, no VPS maintenance.
2. **Docker One-Command Deployment (VPS / NAS / Home Server)**:
   \`\`\`sh
   # International VPS / NAS installer (GHCR image)
   curl -fsSL https://edgeever.org/install.sh | bash

   # Mainland China mirror installer (Tencent TCR image)
   curl -fsSL https://edgeever-installer-1256854452.cos.ap-guangzhou.myqcloud.com/install.sh | bash -s -- --mirror tcr
   \`\`\`
   Configures Docker Compose and automated daily background updates with one command.

### 💾 Complete Data Freedom: Lossless ZIP Portability
Export your entire library at any time from **Profile → Import and export**. The archive contains pure Markdown files with standard YAML Front Matter, relative media paths, and full revision histories—compatible with Obsidian, VS Code, and any plain text editor.

---

> 💡 **Quick Exploration Tips**:
> 1. Click **\`</>\`** in the top right to try seamless dual-view toggling;
> 2. Press **\`Cmd/Ctrl + E\`** to test reading protection mode against accidental edits;
> 3. Press **\`Cmd/Ctrl + O\`** to summon the Quick Switcher;
> 4. Click the **WeChat Icon** to copy formatted rich text ready for publishing;
> 5. Click **"Share as Card"** to export a stunning social poster card;
> 6. Click **"Reset Demo Data"** in settings or the sidebar anytime to restore the demo workspace.
`,
  },
} as const;

export const DEMO_SEED_MEMOS_EN = DEMO_SEED_MEMOS_ZH.map((memo) => {
  const english = DEMO_MEMO_ENGLISH[memo.id as keyof typeof DEMO_MEMO_ENGLISH];
  if (!english) {
    return null;
  }

  return {
    ...memo,
    id: `${memo.id}_en`,
    notebookId: "nb_demo_features_en",
    title: english.title,
    markdown: `${english.markdown}${DEMO_ATTACHMENT_MARKDOWN_EN}`,
  };
}).filter((memo): memo is NonNullable<typeof memo> => memo !== null);

export const DEMO_SEED_MEMOS_ZH_WITH_ATTACHMENTS = DEMO_SEED_MEMOS_ZH.map((memo) => ({
  ...memo,
  markdown: `${memo.markdown}${DEMO_ATTACHMENT_MARKDOWN_ZH}`,
}));

export const DEMO_SEED_MEMOS = [...DEMO_SEED_MEMOS_ZH_WITH_ATTACHMENTS, ...DEMO_SEED_MEMOS_EN];

export const DEMO_SEED_RESOURCES = [
  {
    id: "res_demo_logo",
    memoId: "memo_demo_overview",
    filename: "edgeever-icon.svg",
    mimeType: "image/svg+xml",
    width: 1024,
    height: 1024,
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-labelledby="title desc"><title id="title">EdgeEver</title><desc id="desc">An open cat face in near-black on the EdgeEver green rounded tile.</desc><rect x="100" y="100" width="824" height="824" rx="188" fill="#16a06e" /><g transform="translate(100 100) scale(0.74234234) translate(-72 -72)"><path fill="#07130b" fill-rule="evenodd" d="M253.5 707.5Q249 678 249.5 655Q250 632 253.5 611.5Q257 591 264.5 568.5Q272 546 281 530Q290 514 287 485Q284 456 283.5 417Q283 378 285 351.5Q287 325 292 299Q297 273 304.5 254.5Q312 236 318.5 227.5Q325 219 336 213Q347 207 358.5 207.5Q370 208 383 213.5Q396 219 407 226.5Q418 234 428 242.5Q438 251 455 268.5Q472 286 485.5 303.5Q499 321 510.5 339Q522 357 528 368.5Q534 380 534 385.5Q534 391 532.5 394.5Q531 398 527.5 401Q524 404 518 405Q512 406 507 404Q502 402 499.5 399.5Q497 397 491.5 386Q486 375 474 357Q462 339 450.5 324.5Q439 310 426 296.5Q413 283 400.5 272.5Q388 262 377 255.5Q366 249 361 248Q356 247 352.5 249.5Q349 252 344.5 261Q340 270 337 280Q334 290 329 325.5Q324 361 323.5 400Q323 439 327 479.5Q331 520 321 538Q311 556 306 568.5Q301 581 297 596Q293 611 291 624.5Q289 638 289 661Q289 684 292 702Q295 720 301 739.5Q307 759 315.5 776.5Q324 794 335 810Q346 826 358 838.5Q370 851 386.5 863.5Q403 876 419.5 884.5Q436 893 456 899.5Q476 906 501 909.5Q526 913 529.5 916Q533 919 534.5 922Q536 925 536 931.5Q536 938 532.5 943Q529 948 524 950Q519 952 505.5 951Q492 950 473 946Q454 942 426 931Q398 920 385.5 912.5Q373 905 359.5 894.5Q346 884 333.5 871.5Q321 859 313 849Q305 839 291 815Q277 791 267.5 764Q258 737 253.5 707.5ZM719 941.5Q716 936 717 929Q718 922 721 918.5Q724 915 727 913.5Q730 912 749 910Q768 908 785 903.5Q802 899 823 889.5Q844 880 860.5 868.5Q877 857 887.5 847Q898 837 911 820Q924 803 932 788.5Q940 774 947.5 753.5Q955 733 959.5 708Q964 683 964 660.5Q964 638 960.5 617.5Q957 597 952.5 582.5Q948 568 943.5 558Q939 548 931 535Q923 522 927 479Q931 436 930.5 400Q930 364 925.5 329Q921 294 917 280Q913 266 909 258.5Q905 251 902 249Q899 247 893 248.5Q887 250 867.5 264Q848 278 835.5 290.5Q823 303 810.5 318Q798 333 783.5 354Q769 375 762 387.5Q755 400 751 402.5Q747 405 742 405.5Q737 406 732 404Q727 402 723.5 397Q720 392 720.5 385Q721 378 736.5 353Q752 328 768 307.5Q784 287 803.5 267Q823 247 834 238Q845 229 858.5 221Q872 213 881 210Q890 207 899.5 207Q909 207 918.5 212Q928 217 935.5 226.5Q943 236 949.5 252Q956 268 960 286Q964 304 967.5 344.5Q971 385 970.5 418Q970 451 967 482.5Q964 514 972 528Q980 542 986 558Q992 574 996 591Q1000 608 1002 624.5Q1004 641 1003.5 667Q1003 693 998 719.5Q993 746 985 768Q977 790 964.5 812Q952 834 940 849Q928 864 915.5 876Q903 888 892.5 896Q882 904 858 917Q834 930 820 935Q806 940 789.5 944Q773 948 753 950Q733 952 727.5 949.5Q722 947 719 941.5ZM378.5 728Q373 718 373 714.5Q373 711 375.5 708Q378 705 387 699Q396 693 405 689Q414 685 426 682.5Q438 680 447.5 680Q457 680 467.5 682Q478 684 490 690Q502 696 512.5 706.5Q523 717 530.5 733Q538 749 539.5 762Q541 775 537 778Q533 781 515.5 784Q498 787 481 786.5Q464 786 451 783Q438 780 428.5 775.5Q419 771 412 766Q405 761 394.5 749.5Q384 738 378.5 728ZM713.5 778Q710 775 710.5 767Q711 759 714 749Q717 739 723.5 727.5Q730 716 740.5 706Q751 696 762 690.5Q773 685 785.5 682.5Q798 680 813 681Q828 682 843.5 688Q859 694 869.5 702.5Q880 711 880 714.5Q880 718 871.5 732Q863 746 853 755.5Q843 765 830.5 772Q818 779 804 782.5Q790 786 772.5 786.5Q755 787 736 784Q717 781 713.5 778ZM406 710Q395 716 398 722.5Q401 729 410 738.5Q419 748 427 753Q435 758 441 760Q447 762 444.5 749.5Q442 737 442.5 726.5Q443 716 445 707.5Q447 699 432 701.5Q417 704 406 710ZM819.5 701Q806 699 808 708.5Q810 718 810 730.5Q810 743 808 750.5Q806 758 806 760Q806 762 807 762Q808 762 815 759Q822 756 830.5 750Q839 744 846 736Q853 728 855.5 722Q858 716 845.5 709.5Q833 703 819.5 701ZM471 759.5Q469 763 469 765Q469 767 472 767.5Q475 768 488.5 768Q502 768 512 766Q522 764 519.5 754Q517 744 511 734Q505 724 498.5 718Q492 712 484.5 708Q477 704 475.5 704Q474 704 475 723Q476 742 474.5 749Q473 756 471 759.5ZM733 750.5Q730 759 730 761.5Q730 764 737 765.5Q744 767 763.5 767Q783 767 779.5 752Q776 737 776 730.5Q776 724 778 714Q780 704 770.5 708Q761 712 753 719.5Q745 727 740.5 734.5Q736 742 733 750.5ZM592.5 848.5Q588 841 588 836.5Q588 832 590 829Q592 826 599.5 822.5Q607 819 613.5 818Q620 817 626.5 817Q633 817 642.5 819Q652 821 655 822.5Q658 824 661.5 828.5Q665 833 664.5 838Q664 843 659.5 850Q655 857 645 867Q635 877 631.5 878.5Q628 880 625 879.5Q622 879 617.5 876Q613 873 605 864.5Q597 856 592.5 848.5Z" />\n  </g>\n</svg>',
  },
  {
    id: "res_demo_cat_image",
    memoId: "memo_demo_overview",
    filename: "cute-cat-demo.svg",
    mimeType: "image/svg+xml",
    width: 960,
    height: 540,
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" fill="none"><rect width="960" height="540" rx="32" fill="#f0fdfa"/><g transform="translate(480, 270) scale(2.2)"><path d="M-60,-20 C-60,-60 -30,-80 0,-80 C30,-80 60,-60 60,-20 C60,20 40,40 0,40 C-40,40 -60,20 -60,-20 Z" stroke="#0f766e" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M-45,-68 L-55,-100 L-20,-78" stroke="#0f766e" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M45,-68 L55,-100 L20,-78" stroke="#0f766e" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M-30,-25 Q-20,-15 -10,-25" stroke="#0f766e" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M10,-25 Q20,-15 30,-25" stroke="#0f766e" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M-5,-10 L5,-10 L0,-5 Z" fill="#0f766e"/><path d="M0,-5 Q-5,5 -10,2 M0,-5 Q5,5 10,2" stroke="#0f766e" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M-40,-5 L-65,-8" stroke="#0f766e" stroke-width="4" stroke-linecap="round"/><path d="M-42,5 L-68,7" stroke="#0f766e" stroke-width="4" stroke-linecap="round"/><path d="M40,-5 L65,-8" stroke="#0f766e" stroke-width="4" stroke-linecap="round"/><path d="M42,5 L68,7" stroke="#0f766e" stroke-width="4" stroke-linecap="round"/><path d="M-30,35 C-30,70 -10,90 0,90 C10,90 30,70 30,35" stroke="#0f766e" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M25,75 C45,75 55,60 55,45 C55,30 45,25 40,30 C35,35 40,45 45,45" stroke="#0f766e" stroke-width="6" stroke-linecap="round" fill="none"/></g></svg>',
  },
] as const;

export const DEMO_SEED_ATTACHMENT_RESOURCES = [...DEMO_SEED_RESOURCES, ...DEMO_ATTACHMENT_RESOURCES];
export const DEMO_SEED_NOTEBOOK_IDS = DEMO_SEED_NOTEBOOKS.map((notebook) => notebook.id);
export const DEMO_SEED_MEMO_IDS = DEMO_SEED_MEMOS.map((memo) => memo.id);
