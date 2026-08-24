<h1><img src="assets/brand/edgeever-icon.svg" alt="EdgeEver Logo" width="40" align="absmiddle" /> EdgeEver</h1>

[![GitHub Stars](https://img.shields.io/github/stars/tianma-if/edgeever?style=social)](https://github.com/tianma-if/edgeever/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/tianma-if/edgeever?style=social)](https://github.com/tianma-if/edgeever/network/members)

簡體中文 | [English](README.md)

> **EdgeEver：開源、原生支持 AI、可自由部署的自託管「印象筆記」替代方案。**

EdgeEver 是一款現代化的開源筆記工作區。它爲你找回經典印象筆記的三欄高效體驗，同時具備完全開放的數據架構與原生 AI Agent 聯動能力，讓個人知識沉澱更輕量、更自由。

> 💡 **終身免服務器，100% 免費**
> EdgeEver 可以免費運行在 Cloudflare 配額內，無需購買或維護服務器；希望使用 VPS、NAS 或家庭服務器的用戶，也可以通過 Docker 部署同一套應用。

> ⭐ 如果 EdgeEver 對你有幫助，歡迎點個 Star。你的支持會幫助更多人發現這個項目。

## 爲什麼做 EdgeEver

很多長期使用**印象筆記**的用戶，核心需求只是一個**可靠、開放、響應迅速**的個人知識庫。然而，當下的主流方案都各有痛點：

* **印象筆記**：功能日益臃腫，商業廣告與繁雜附加功能充斥，性能與內存佔用居高不下；且數據相對封閉難以導出，免費版限制重重，支持 AI/MCP 的套餐訂閱成本高昂。
* **Obsidian**：功能強大且高度開放，但對於“隨時隨地隨手記”的輕量場景來說偏重；官方同步費用昂貴，第三方同步配置繁瑣。
* **Memos 等輕量筆記**：雖然簡單好用，但流式卡片佈局與習慣了經典“三欄工作流”的用戶有着天然的交互習慣差異。

**EdgeEver 恰好填補了這一空白**：在保留你最熟悉的經典三欄佈局與流暢排版的同時，賦予數據完全的自由度，原生支持接入 AI Agent，且部署維護零門檻、零費用。

> 💡 **最佳實踐推薦：**
> 用 **EdgeEver** 隨時捕捉靈感與備忘，作爲知識的“原料庫”；當需要結構化整理或創作發佈時，既能通過 **MCP** 喚醒 AI 助手智能歸納並同步至 **Obsidian**、**Notion** 或**飛書多維表格**，也能一鍵將文章精美排版並複製到**微信公衆號**直接發佈。

## 在線演示

- Demo 地址：[https://demo.edgeever.org](https://demo.edgeever.org)

公開演示環境會在每天凌晨 3:00（北京時間）自動重置並恢復示例筆記，請不要保存私密內容。

## 功能

- **自由選擇部署方式**：同一套應用既可免費運行於 Cloudflare Serverless，也可通過 Docker 部署到 VPS、NAS 或家庭服務器。
- **數據開放，不設圍牆**：基於標準 SQLite 存儲，提供 REST API、MCP 與 CLI 接口。數據隨時可讀可導，不再擔心被任何特定平臺綁定。
- **無損 ZIP 打包與無縫遷移**：一鍵打包導出包含 Markdown、Front Matter、嵌套目錄及附件的完整檔案，同時保留歷史版本與結構化數據，方便在不同實例間完整還原。
- **原生 AI Agent 智腦聯動**：內置 MCP（Model Context Protocol）協議，支持 Claude Code、Codex、Antigravity 等 AI 助手直接讀取與整理筆記，也可與 Notion Database、飛書多維表格輕鬆打通。
- **接入自己的 AI 模型**：支持添加多個 OpenAI、Anthropic、Gemini 兼容服務與第三方中轉平臺，在編輯器中隨時對全文或選區進行智能總結、要點提煉、語法校對、翻譯與續寫潤色。
- **插件擴展能力**：支持從插件市場安裝客戶端插件與主題，擴展筆記操作、編輯器命令和自定義面板等能力。
- **多端無縫同步，無設備限制**：自託管數據無商業限制，擺脫免費賬號僅限 2 臺設備的束縛，在 PC、平板與手機上隨心同步。
- **經典三欄佈局與專注模式**：筆記本樹、筆記列表與編輯區一目瞭然；桌面端一鍵開啓專注模式，讓思緒盡情鋪滿屏幕。
- **無限層級筆記本**：輕鬆構建清晰的多級目錄結構。
- **微信公衆號一鍵排版與複製**：專爲中文創作者設計，支持將筆記一鍵轉換爲帶行內樣式的公衆號美化格式，直接複製粘貼至微信公衆號後臺，告別複雜的第三方排版工具。
- **優雅的雙視圖編輯**：桌面端支持在富文本與 Markdown 源碼視圖之間自由切換。
- **單篇筆記便捷導出**：可將當前筆記直接導出爲 Markdown、HTML 或 PDF，方便獨立保存、分享與發佈。
- **Mermaid 架構圖與流程圖渲染**：原生支持 Mermaid 代碼塊渲染，視圖切換時完整保留可編輯源碼，讓繪製邏輯圖表更直觀。
- **筆記歷史版本回溯**：自動記錄修改歷史，隨時查閱與還原過往版本。
- **公開筆記分享**：支持公開分享筆記，並可隨時取消分享。
- **移動 App 微信公衆號文章剪藏**：在手機上將微信公衆號文章分享至 EdgeEver，即可提取正文並保存爲可繼續編輯的筆記。
- **智能前端圖片壓縮**：圖片上傳前在瀏覽器端靜默完成壓縮，常見截圖與大圖精簡 50%-90% 體積，加載更迅速、存儲更省心。
- **通用文件附件支持**：支持輕鬆上傳並插入 PDF、Office 文檔、壓縮包及音視頻等各種附件。
- **高效多選與批量操作**：支持筆記批量合併、批量移動，以及筆記本拖拽排序與層級調整。
- **離線草稿與同步隊列**：網絡不穩定時自動保存離線草稿，恢復連線後自動入隊同步。
- **多賬號與個人空間隔離**：單實例支持創建多個獨立賬號，用戶數據相互隔離，配備直觀的管理員賬號管理與安全加密機制。
- **全平臺多端覆蓋**：支持 Web、[Android](https://play.google.com/store/apps/details?id=org.edgeever.mobile)、[macOS](https://github.com/tianma-if/edgeever/releases) 和 [iOS](https://apps.apple.com/us/app/edgeever/id6792625631)，Windows 版即將推出；網頁裁剪插件支持 [Chrome](https://chromewebstore.google.com/detail/edgeever-web-clipper/gjadpfmanienmlofajibkfkkpfdkclgo)、[Edge](https://chromewebstore.google.com/detail/edgeever-web-clipper/gjadpfmanienmlofajibkfkkpfdkclgo) 和 [Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/edgeever-web-clipper/)。

## 部署

Cloudflare 是推薦的零服務器部署方式；希望使用 VPS、NAS 或家庭服務器的用戶也可以選擇 Docker。

Cloudflare 在線部署可以選擇以下兩種方式之一：

### 方案一：AI Agent 一鍵部署（推薦）

將下方提示詞直接複製發送給 AI Agent（如 Codex、Claude、Cursor、workbuddy、Antigravity、OpenClaw、Hermes Agent 等）。執行過程中，如需訪問 GitHub 或 Cloudflare，請確認權限範圍並按提示完成授權。

```text
請在線完成 EdgeEver 部署：
1. Fork https://github.com/tianma-if/edgeever。
2. 將這個 Fork 導入 Cloudflare Workers & Pages。
3. 創建 D1 `edgeever` 與 R2 `edgeever-resources`，設置
   `EDGE_EVER_AUTH_PASSWORD` Worker Secret，並配置生產環境 `main` 構建。
4. 啓動首次構建，驗證 `/api/health`、`/api/openapi.json` 和登錄。
5. 啓用並手動運行一次名爲 `Update deployed EdgeEver` 的 GitHub Actions 工作流，
   以便後續自動同步更新，持續獲得 EdgeEver 最新的產品特性和問題修復。
```

> 詳細約定與要求請查看：[AI Agent 在線部署約定](docs/agent-deploy-cloudflare.zh-CN.md)。

### 方案二：手動在線部署

僅需在網頁端完成 5 步極簡配置：

1. **Fork 倉庫**：在 GitHub 點擊右上角 **Fork**，將項目 Fork 到您的個人賬戶下。
2. **啓用 Actions**：進入 Fork 的 **Actions** 標籤頁，點擊 **I understand my workflows, go ahead and enable them**，確保名爲 **Update deployed EdgeEver** 的 GitHub Actions 工作流能夠自動運行，從而持續獲得 **EdgeEver** 最新的產品特性和問題修復。
3. **導入 Cloudflare**：登錄 Cloudflare 控制台，進入 **Workers & Pages**，選擇導入該 Fork 倉庫。
4. **創建資源與登錄憑據**：創建 D1 `edgeever` 與 R2 `edgeever-resources`，並添加 Worker Secret `EDGE_EVER_AUTH_PASSWORD` 作爲管理員登錄密碼。binding 由部署命令生成，不要修改 Fork 中的文件。
5. **啓動構建與驗證**：使用默認構建配置啓動首次構建，部署完成後訪問 `/api/health` 確認返回 `200` 即可開始使用。

> 📖 包含具體參數與構建命令的詳細步驟，請查看 [在線部署完整文檔](docs/deploy-cloudflare-button.zh-CN.md)。

> 💡 **Cloudflare R2 開通**：雖然 Cloudflare R2 存儲提供了足夠慷慨、在筆記場景中完全不會超量的[免費存儲額度](https://developers.cloudflare.com/r2/pricing/#free-tier)，但需先開通 R2 subscription 並綁定付款方式。Cloudflare [官方支持](https://developers.cloudflare.com/billing/get-started/update-billing-info/#supported-payment-methods) 銀聯（UnionPay）、Visa、Mastercard 等銀行卡，以及 PayPal、Apple Pay、Google Pay 等付款方式。

### 方案三：在 VPS 或 NAS 上使用 Docker

如果 VPS 或 NAS 位於中國大陸境外，使用 GitHub 託管的安裝腳本和 GHCR 鏡像：

```sh
curl -fsSL https://edgeever.org/install.sh | bash
```

如果 VPS 或 NAS 位於中國大陸境內，使用騰訊雲 COS 安裝腳本和騰訊雲 TCR 鏡像，
下載速度和穩定性通常更好：

```sh
curl -fsSL https://edgeever-installer-1256854452.cos.ap-guangzhou.myqcloud.com/install.sh | bash -s -- --mirror tcr
```

兩種方式都會自動拉取最新鏡像、生成管理員密碼、使用 Docker Compose 啓動
EdgeEver，並設置每日自動更新。手動部署與配置說明見 [Docker 部署文檔](docs/deploy-docker.zh-CN.md)。

---

## 多賬號登錄

部署完成後，單個實例支持多賬號登錄。

實例管理員可以在 **個人中心** -> **賬號管理** 中創建、停用成員賬號或重置密碼。每個成員擁有完全隔離的個人空間，包括筆記本、筆記、附件、回收站、導入導出和 MCP Token 等。

## 瀏覽器網頁裁剪插件

網頁裁剪插件已在 Chrome、Microsoft Edge 與 Firefox 正式上架。請從對應的瀏覽器商店安裝（Edge 瀏覽器亦可直接安裝 Chrome Web Store 版本）：

<p>
  <a href="https://chromewebstore.google.com/detail/edgeever-web-clipper/gjadpfmanienmlofajibkfkkpfdkclgo"><img src="https://raw.githubusercontent.com/alrra/browser-logos/58881b84c4d73adc03c06fa2c275a7abee02d935/src/chrome/chrome.svg" alt="爲 Google Chrome 安裝 EdgeEver 網頁裁剪插件" width="36" height="36" /></a>&nbsp;&nbsp;
  <a href="https://chromewebstore.google.com/detail/edgeever-web-clipper/gjadpfmanienmlofajibkfkkpfdkclgo"><img src="https://raw.githubusercontent.com/alrra/browser-logos/58881b84c4d73adc03c06fa2c275a7abee02d935/src/edge/edge.svg" alt="爲 Microsoft Edge 安裝 EdgeEver 網頁裁剪插件" width="36" height="36" /></a>&nbsp;&nbsp;
  <a href="https://addons.mozilla.org/zh-CN/firefox/addon/edgeever-web-clipper/"><img src="https://raw.githubusercontent.com/alrra/browser-logos/58881b84c4d73adc03c06fa2c275a7abee02d935/src/firefox/firefox.svg" alt="爲 Firefox 安裝 EdgeEver 網頁裁剪插件" width="36" height="36" /></a>
</p>

開發者也可參考[擴展開發說明](apps/extension/README.md)從源碼構建並加載插件。

## 關於客戶端

原生客戶端提供更流暢、穩定的使用體驗，以及更完善的系統級集成，並支持本地存儲與離線編輯。恢復聯網後，內容會自動增量同步，適合高頻使用和弱網場景。

Android App 現已上架 [Google Play](https://play.google.com/store/apps/details?id=org.edgeever.mobile)，也可從 [GitHub Releases](https://github.com/tianma-if/edgeever/releases) 下載簽名 APK。iOS App 現已上架 [App Store](https://apps.apple.com/us/app/edgeever/id6792625631)，可使用非大陸區的 Apple ID 下載。

macOS App 可從 [GitHub Releases](https://github.com/tianma-if/edgeever/releases) 下載。Windows 版本正在處理代碼簽名證書問題，解決後即可發佈。

暫無原生客戶端的平臺，可通過 Chrome 或 Edge 將 EdgeEver 安裝爲 PWA 使用。

## 社區與反饋

- Bug、功能建議和部署問題請優先提交 [GitHub Issues](https://github.com/tianma-if/edgeever/issues)，方便後續用戶檢索和複用解決方案。
- 貢獻代碼前請閱讀[貢獻代碼須知](CONTRIBUTING.zh-CN.md)。如果您的 Fork 同時用於部署 EdgeEver，請將 `main` 分支僅用於部署；從官方 `upstream/main` 新建獨立分支，在該分支中同步上游、開發並提交 Pull Request，不要在部署用的 `main` 上開發或執行 Sync fork。

### 微信交流羣

歡迎加入 EdgeEver AI 交流羣，這裏聚集了大量 Vibe Coding 與 AI 玩家。一起交流 EdgeEver 體驗、AI Agent 實戰落地、高性價比/免費 AI 資源及自動化工作流。

> 羣二維碼 7 天內有效。如果二維碼過期，請添加微信 `m1245207870`，並備註“EdgeEver 進羣”。

<p align="center">
  <img src="assets/wechat-group-qr.jpg" alt="EdgeEver AI 交流羣二維碼" width="260" />
</p>

## 技術棧

- Bun workspace monorepo，包含 Web、API、官網與共享類型包。
- 官網：Astro 靜態站點，位於 `apps/site`，可獨立構建並部署到 Cloudflare Pages。
- 前端：Vite、React、React Router、TanStack Query，UI 基於 Tailwind CSS、shadcn/ui、Radix UI。
- 編輯器：TipTap / ProseMirror，支持 Markdown；PWA 使用 vite-plugin-pwa、Workbox、Dexie。
- Android App：`apps/mobile` 中的 Expo + React Native，採用 SQLite 本地存儲與增量同步。
- iOS App：`apps/ios` 中的原生 SwiftUI（iOS 17+），內置 TipTap EditorBundle、GRDB 本地鏡像/outbox，界面與 Android 殼層對齊。
- 原生桌面端：Electron + Rust sidecar，兼顧跨平臺一致體驗與高性能本地數據服務；基於 SQLite 支持離線編輯、聯網後增量同步與本地備份。
- 網頁裁剪：Manifest V3、Mozilla Readability、Turndown，支持 Chrome、Microsoft Edge 與 Firefox。
- 後端：一套基於 Hono/Zod 的業務應用，提供 REST API、OpenAPI 與 Remote MCP；Cloudflare 使用 Workers/D1/R2，Docker 使用 Bun/SQLite/本地文件或 S3。

## 快速開始

```sh
bun install
bun run dev
```

## 目錄結構

```text
apps/web          Vite + React 前端、PWA、離線草稿與同步隊列
apps/extension    Chrome/Edge/Firefox Manifest V3 網頁裁剪插件
apps/api          Cloudflare Worker + Hono API、OpenAPI、MCP endpoint
apps/mobile       Expo + React Native Android App
apps/ios          原生 SwiftUI iOS App（TipTap EditorBundle、GRDB）
apps/desktop      Electron 桌面端殼層、preload bridge 與原生打包配置
apps/site         Astro 官方網站，可獨立部署
packages/client   Web 與移動端共享的 API Client
packages/shared   共享類型、Zod schema、TipTap / Markdown 內容轉換
crates/desktop-sidecar
                   Rust sidecar，負責本地 SQLite、離線數據、備份與資源服務
scripts           Wrangler 封裝、密碼 hash、CLI、MCP stdio bridge、Evernote ENEX 導入
migrations        D1/SQLite 共用、只增不改的數據庫 migration
docs              OpenAPI schema、架構、遷移與部署文檔
.github/workflows Web、移動端、iOS、桌面端打包、部署與 Release 的 CI
wrangler.toml     Cloudflare Workers、Assets、D1、R2 配置
```

## 內容格式

EdgeEver 同時保存三種內容形態：

```text
content_json      TipTap/ProseMirror 文檔，編輯器權威格式
content_markdown  API、Agent、導入導出使用
content_text      搜索、摘要和索引使用
```

請打開 **我的** -> **導入與導出**，導出或導入 EdgeEver ZIP。壓縮包中的 `notes/` 目錄可直接作爲 Markdown 閱讀和遷移，結構化數據則用於在 EdgeEver 實例之間完整恢復；導入時目標實例中的無關數據會保留，相同 EdgeEver ID 的內容會被覆蓋。

## API 文檔

OpenAPI schema：

```text
https://你的域名/api/openapi.json
```

倉庫內文件：[docs/openapi.json](docs/openapi.json)。

## MCP

在 **個人中心** -> **MCP 設置** 中創建 API Token 並交給 AI Agent，即可讓 Agent 在賬號授權範圍內安全地讀取、整理和導入筆記，管理筆記模板與 AI 指令，並與 Notion Database、飛書多維表格等工具聯動。

> 放飛你的想法：讓 AI Agent 歸納隨手記錄的靈感、構建個人知識圖譜、根據筆記生成用戶畫像，或自動爲筆記打標籤。

## 圖片壓縮規則

圖片壓縮僅在 Web 端上傳前執行，由設置頁的“壓縮筆記內圖片”開關控制。啓用後，瀏覽器會把 PNG、JPEG、WebP、AVIF 嘗試壓縮爲 WebP，並將最長邊限制在 `2560px` 以內；如果壓縮結果不比原圖小，則保留原圖。

Cloudflare Worker 側執行圖片處理會消耗計算/圖片處理額度，因此 EdgeEver 將圖片壓縮放在 Web 客戶端完成；REST API 或 MCP 上傳入口會按客戶端提供的文件內容直接入庫，不再由服務端自動壓縮。

## 高級對象存儲

實例 Owner 可在**設置 → 高級設置 → OSS 對象存儲**中配置兼容 S3 API 的對象存儲。切換存儲不會遷移或影響已有附件。Cloudflare 部署還需配置至少 32 個字符的 `EDGE_EVER_STORAGE_ENCRYPTION_KEY` Worker Secret。

## 導入與遷移 (Migration)

如果你想從其他筆記軟件遷移到 EdgeEver，請參考以下極簡遷移指引：

- **印象筆記（Evernote）的遷入**：請參考 [docs/evernote-migration-guide.md](docs/evernote-migration-guide.md)
- **Memos 筆記的遷入**：請參考 [docs/memos-migration-guide.md](docs/memos-migration-guide.md)
- **Notion 筆記的遷入**：請參考 [docs/notion-migration-guide.md](docs/notion-migration-guide.md)

## Docker 部署

Docker 與 Cloudflare 共用同一套前端、API 路由、業務服務、鑑權、MCP 實現和 migration。容器使用 SQLite，並支持本地文件或 S3 兼容附件存儲，提供 `amd64` 與 `arm64` 鏡像。詳見[使用 Docker 部署 EdgeEver](docs/deploy-docker.zh-CN.md)和[自託管與 Docker 架構](docs/self-hosting-architecture.zh-CN.md)。

## 致謝

- “minimal品牌綠”主題排版架構借鑑於 [obsidian-minimal](https://github.com/kepano/obsidian-minimal)。
- “Outline 品牌綠”主題排版架構借鑑於 [Outline](https://github.com/outline/outline)。
- “經典藍白”主題借鑑了早期 [StackEdit](https://github.com/benweet/stackedit)/[Bootstrap](https://github.com/twbs/bootstrap) 系 Markdown 排版風格，並參考[馬克飛象](https://maxiang.io/)完善中文排版細節。

## 免責聲明

EdgeEver 是一款完全獨立的開源筆記軟件，由個人和社區自主開發維護。本項目與 Evernote®（印象筆記）及其關聯公司不存在任何商業合作、授權、贊助或隸屬關係。
