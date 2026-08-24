# Cloudflare Workers Builds

## 配置

使用[在線部署文檔](deploy-cloudflare-button.zh-CN.md)中的構建命令和部署命令，倉庫根目錄爲 `/`，生產分支爲 `main`。

授權：

1. 爲部署倉庫授權 **Cloudflare Workers & Pages** GitHub App。
2. 如果 Agent 集成需要 Cloudflare API Token，使用限制到目標賬號的 User API Token。
3. 部署 API Token 在 Cloudflare **Worker -> Settings -> Builds -> API token** 中配置。

`EDGE_EVER_AUTH_PASSWORD` 應配置在 Worker 的 **Settings -> Variables and Secrets** 中，作爲運行時 Secret；不要把密碼複製到 Builds 的構建變量。`deploy:cloudflare-builds` 會複用該 Secret，並在部署後驗證它是否存在。

受版本控制的 `wrangler.toml` 必須保持不變。普通部署使用 D1 `edgeever`、R2 `edgeever-resources` 和用戶名 `admin`。`EDGE_EVER_AUTH_USERNAME`、`EDGE_EVER_WORKER_NAME`、`EDGE_EVER_D1_DATABASE_NAME`、`EDGE_EVER_R2_BUCKET_NAME` 與自定義路由等可選非敏感實例參數，應放在 **Settings -> Builds -> Variables and secrets**。Workers Builds 變量只對構建命令可見，不會直接成爲 Worker 運行時變量；部署命令會用它們生成臨時 Wrangler 配置。密碼及其他憑據始終屬於運行時 Secret。

舊版兼容會自動完成：未顯式設置 R2 或用戶名 Builds 變量時，升級會檢查正在承載生產流量的 Worker 版本，並保留其已有的 `RESOURCES` 存儲桶和管理員用戶名；全新 Worker 才使用標準默認值。

## 更新與排錯

- `main` 推送會自動構建、執行 D1 migration、部署並驗證。
- **Update deployed EdgeEver** 把部署用 Fork 當作上游的 **部署鏡像** 來維護：
  - 默認 `stable` 通道跟隨最新正式 Release tag。
  - 設置 GitHub Repository Variable `EDGE_EVER_UPDATE_CHANNEL=edge` 後跟隨上游 `main`。
  - 只讀 Fork（未改應用代碼）會用一個新的線性提交應用目標版本的產品代碼快照，不安裝依賴，也不執行項目測試套件。
  - 只有顯式設置 `EDGE_EVER_PRESERVE_FORK_CHANGES=true` 的 Fork 纔會合併產品代碼。定製合併會在 push 前執行本地 migration、完整非 E2E 測試、類型檢查和生產構建；任一步失敗都會保持 `main` 與線上版本不變。
  - 正式 Release 會在準備 Draft 資產前，由官方 Ubuntu Job 執行同一套完整非 E2E 測試，確保 stable 通道的上游基線本身爲綠色；定製 Fork 若失敗，應代表合併集成問題，而不是 Release 自帶的測試已經失敗。
  - 下游完整的 `.github/workflows/**` 目錄和兩個更新輔助腳本會作爲穩定的本地引導層原樣保留。官方打包、簽名、測試與 Release 工作流不參與產品代碼自動更新，因此 `GITHUB_TOKEN` 無需取得改寫 Actions 工作流的權限。
  - 每次運行都會寫中英雙語 Job **Summary**，分別展示 Fork 的 Git 狀態、部署觸發狀態和線上驗證狀態。若定時運行綠色成功並寫明 *Already on upstream target* / 已對齊，表示本次未請求部署；push 成功只表示已請求部署，仍需在 Cloudflare 中確認。
  - 請優先用本工作流，而不是 GitHub **Sync fork**。Sync fork 跟的是上游 `main` 歷史，可能讓下一次 stable 運行合理變爲 no-op。
- 可選：倉庫 Secret `EDGE_EVER_CLOUDFLARE_DEPLOY_HOOK_URL`，在成功 push 後觸發 Cloudflare Deploy Hook（Git 集成偶發未構建時有用）。
- 手動運行工作流時，即使 Git 已是最新，也會推送空 commit 重新觸發 Cloudflare 構建；定時檢查在已對齊時仍保持 no-op。
- 構建失敗：查看 Worker **Deployments** 日誌，確認部署 commit SHA 與 Fork `main` 一致。
- 定時任務從不運行：公共 Fork 需在 **Actions** 中啓用 **Update deployed EdgeEver**（Fork 上 schedule 默認禁用，長期不活躍也可能被暫停）。
- 更新 push 被 `without workflows permission` 拒絕：說明 Fork 仍在使用舊版更新器。請用倉庫所有者權限執行一次 GitHub **Sync fork**，再重新運行 **Update deployed EdgeEver**；完成這次引導後，日常產品更新不再需要 **Sync fork**。
