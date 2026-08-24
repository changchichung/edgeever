# EdgeEver 手動在線部署指南

本文檔爲在線部署 EdgeEver 的詳細圖文操作指南。整個部署流程在瀏覽器中即可完成，**不需要本地安裝任何代碼或配置本地環境**。

> 💡 **零成本自託管**：部署完全使用 Cloudflare 免費配額，**無需購買 VPS / 雲服務器，也不需要折騰域名證書或 Docker**。

---

## 前置準備

- **GitHub 賬戶**（用於 Fork 倉庫及配置自動更新）
- **Cloudflare 賬戶**（用於託管 Worker 邏輯、SQLite 數據庫及文件存儲）

---

## 首次部署圖文指南

### 步驟 1：Fork 倉庫並開啓 Actions

1. 訪問 EdgeEver 官方倉庫：`https://github.com/tianma-if/edgeever`。
2. 點擊右上角 **Fork** 按鈕，將倉庫 Fork 到您的個人 GitHub 賬戶下。
3. 進入您 Fork 後的倉庫，切換到 **Actions** 標籤頁，點擊 **"I understand my workflows, go ahead and enable them"** 啓用自動化工作流。

---

### 步驟 2：在 Cloudflare 創建存儲與數據庫資源

登錄 [Cloudflare Dashboard](https://dash.cloudflare.com/) 控制台：

1. **創建 D1 數據庫**：
   - 導航至 **Workers & Pages** -> **D1**，點擊 **Create database**。
   - 數據庫名稱嚴格填入：`edgeever`，點擊 **Create**。
2. **創建 R2 存儲桶**（用於存儲筆記附件與圖片）：
   - 導航至 **Workers & Pages** -> **R2**，點擊 **Create bucket**。
   - 存儲桶名稱嚴格填入：`edgeever-resources`，點擊 **Create bucket**。

---

### 步驟 3：導入項目並配置登錄 Secret

1. 在 Cloudflare 控制台中，進入 **Workers & Pages** -> **Overview**，點擊 **Create application** -> **Pages** / **Workers** (選擇導入 Git 倉庫)。
2. 選擇 **Connect to Git**，授權並選中您剛纔 Fork 的 `edgeever` 倉庫。
3. 在項目設置中：
   - **Production branch**：選擇 `main`
   - **Root directory**：保持留空或默認 `/`
4. 在 **Settings** -> **Variables and Secrets** 中添加登錄密碼：

| 類型 (Type) | 名稱 (Name) | 值 (Value) | 說明 |
| :--- | :--- | :--- | :--- |
| **Secret** | `EDGE_EVER_AUTH_PASSWORD` | 設置一個高強度管理員密碼 | 初始登錄憑據 |

> `EDGE_EVER_AUTH_PASSWORD` 是 Worker 運行時 Secret，不是 Workers Builds 構建變量。標準部署命令會複用並驗證這個 Secret；無需、也不應把密碼重複填寫到構建變量中。

倉庫中的部署命令會根據標準資源名稱生成 `DB` 與 `RESOURCES` binding。不要修改 `wrangler.toml`，也不要在控制台中重複添加 binding。

按舊版文檔創建過自定義 R2 存儲桶的已有部署，不需要改名或遷移數據。未顯式設置 Builds 變量時，部署命令會讀取線上 Worker 當前的 `RESOURCES` binding，並自動繼續使用原存儲桶。

---

### 步驟 4：設置構建命令並啓動構建

在 Cloudflare 項目的 **Build settings**（構建設置）中配置：

```text
Build command:  bun install --frozen-lockfile && EDGE_EVER_DEPLOYMENT_TRIGGER=main_push EDGE_EVER_DEPLOYMENT_METHOD=cloudflare_workers_builds bun run build:cloudflare
Deploy command: bun run deploy:cloudflare-builds
```

點擊 **Save and Deploy** 啓動首次構建部署。

部署命令會根據 `edgeever` 數據庫名稱自動查詢 D1 UUID。受版本控制的 `wrangler.toml` 必須保持不變；若把實例專屬配置提交到該文件，部署會直接拒絕。Workers Builds API Token 必須具有 D1 讀取和編輯權限。

發佈完成後，CI 部署會記錄 Wrangler 返回的實際公網入口，並請求該入口的 `/api/health`。如果線上 Worker 缺少 `DB` 或 `RESOURCES` binding、綁定了未初始化的 D1，或沒有返回健康狀態，構建會直接失敗。

---

### 步驟 5：驗證部署與登錄

1. 構建完成後，Cloudflare 會爲您生成一個二級域名（如 `https://edgeever.your-subdomain.workers.dev`）。
2. 在瀏覽器打開該域名下的健康檢查接口：`https://你的域名/api/health`，確認返回 `200` 及 JSON：
   ```json
   { "ok": true }
   ```
3. 打開主站首頁，輸入您配置的管理員用戶名（默認是 `admin`）和密碼（`EDGE_EVER_AUTH_PASSWORD`）測試登錄並開始使用。
4. 返回 Fork 的 GitHub 倉庫 **Actions** 頁面，手動觸發運行一次 **Update deployed EdgeEver** 工作流，確保未來可自動跟進上游更新。

---

## 高級配置：更新通道設置

默認情況下，**Update deployed EdgeEver** 跟隨官方正式 Release（穩定版）。若希望跟隨上游 `main`（Edge 預覽版），請在 Fork 倉庫設置 **GitHub Repository Variable**（**Settings → Secrets and variables → Actions → Variables**）：

```text
EDGE_EVER_UPDATE_CHANNEL=edge
```

手動運行工作流時也可以直接選擇 `stable` / `edge`。

## 高級配置：實例參數

普通部署不需要配置以下參數。如需自定義實例，請在 **Settings -> Builds -> Variables and secrets** 中添加非敏感構建變量，不要修改倉庫文件：

| 構建變量 | 用途 |
| :--- | :--- |
| `EDGE_EVER_AUTH_USERNAME` | 管理員用戶名，默認爲 `admin` |
| `EDGE_EVER_WORKER_NAME` | Worker 名稱 |
| `EDGE_EVER_D1_DATABASE_NAME` | D1 數據庫名稱，UUID 會自動查詢 |
| `EDGE_EVER_D1_DATABASE_ID` | 自動查詢不可用時的可選 UUID 兜底值 |
| `EDGE_EVER_R2_BUCKET_NAME` | 可選的生產 R2 存儲桶顯式覆蓋；升級時默認沿用線上 binding |
| `EDGE_EVER_R2_PREVIEW_BUCKET_NAME` | 預覽環境 R2 存儲桶名稱 |
| `EDGE_EVER_WORKERS_DEV` | 啓用或禁用 `workers.dev` 路由 |
| `EDGE_EVER_CUSTOM_DOMAIN` / `EDGE_EVER_ROUTE_PATTERN` | 自定義路由 |

密碼及其他憑據始終屬於 Worker 運行時 Secret，絕不能放入 Builds 構建變量。高級本地部署也可以使用被 Git 忽略的 `.env.local`，或倉庫外部的 `WRANGLER_CONFIG` 文件。

---

## 常見問題與排錯

- **首次構建失敗**：請檢查 Cloudflare 控制台中 Worker 的 **Deployments** 構建日誌，確認標準資源名稱嚴格爲 `edgeever` 與 `edgeever-resources`，並確認 Workers Builds API Token 具有 D1 讀取和編輯權限。如有意使用其他 D1 數據庫，請設置 `EDGE_EVER_D1_DATABASE_NAME`；僅在自動查詢 UUID 不可用時再添加 `EDGE_EVER_D1_DATABASE_ID`。
- **無法同步上游更新**：
  1. 打開 Fork 的 **Actions**，啓用 **Update deployed EdgeEver**（公共 Fork 上定時任務默認關閉）。
  2. 手動 **Run workflow** 一次，打開中英雙語 Job **Summary**：會分別展示上游目標、Git 發佈結果、部署觸發狀態，以及線上部署是否已經驗證。
  3. 若定時運行綠色成功且 Summary 爲 *Already on upstream target* / 已對齊，表示 Git 已是該通道目標版本，不是靜默故障。手動運行在已對齊時會自動重新發布所選版本；若此後網站仍舊，請對照 Cloudflare **Deployments** 的 commit SHA。
  4. 日常升級請優先用本工作流，而不是 GitHub **Sync fork**。
  5. 若舊版更新器報錯 `without workflows permission`，請使用倉庫所有者身份執行一次 **Sync fork**，然後重新運行 **Update deployed EdgeEver**。新版更新器會保留 `.github/workflows/**`，後續產品更新不會再觸發這項權限限制。
- **Git 已 push 但網站沒變**：確認 Workers Builds 是否針對新的 `main` SHA 構建。可選：添加倉庫 Secret `EDGE_EVER_CLOUDFLARE_DEPLOY_HOOK_URL`，讓工作流在 publish 後調用 Deploy Hook。
- **需要重置或手動恢復部署**：請參閱 [手動部署指南](manual-deploy.zh-CN.md)。
