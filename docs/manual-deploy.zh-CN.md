# Cloudflare 手動部署與恢復

本頁只用於高級配置、故障排查和緊急恢復。普通用戶請使用[從 Fork 在線部署](deploy-cloudflare-button.zh-CN.md)，AI Agent 請使用[AI Agent 在線部署](agent-deploy-cloudflare.zh-CN.md)。

## 首次手動部署

1. Fork 倉庫並克隆到本地。
2. 安裝 Node.js 22+ 和 Bun。
3. 初始化配置和 Cloudflare 資源：

   ```sh
   cp .env.local.example .env.local
   bun install
   EDGE_EVER_PASSWORD='<首次登錄密碼>' bun run deploy:setup
   bun run deploy:doctor
   bun run deploy:manual
   ```

`deploy:setup` 會創建或複用 D1、R2，並將配置寫入被 Git 忽略的 `.env.local`。新部署必須提供 `EDGE_EVER_PASSWORD`，生產環境不存在默認密碼。

使用本地 CLI 部署時，可在 `.env.local` 中設置 `EDGE_EVER_DEPLOYMENT_URL=https://<你的 Worker 域名>`，讓部署驗證同時請求線上的 `/api/health`；CI 部署會自動從 Wrangler 輸出中識別公網地址。未顯式配置地址時，本地驗證仍會檢查遠端 D1 schema 和 Worker Secret，並明確提示已跳過線上健康檢查。

部署完成後，確認：

- `/api/health` 返回 `200` 和 `"ok": true`
- `/api/openapi.json` 可以訪問
- `admin` 可以使用通過 `EDGE_EVER_PASSWORD` 提供的密碼登錄

## 手動創建資源

```sh
cp .env.local.example .env.local
bun install
bunx wrangler d1 create edgeever
bunx wrangler r2 bucket create edgeever-resources
```

將返回的 D1 ID 和資源名稱寫入 `.env.local`：

```text
EDGE_EVER_D1_DATABASE_ID=<database_id>
EDGE_EVER_R2_BUCKET_NAME=edgeever-resources
EDGE_EVER_AUTH_USERNAME=admin
EDGE_EVER_AUTH_PASSWORD=<強密碼>
EDGE_EVER_SESSION_TTL_DAYS=400
# 可選的應用層登錄防護參數；同樣適用於 Docker + SQLite。
EDGE_EVER_AUTH_LOGIN_WINDOW_SECONDS=900
EDGE_EVER_AUTH_LOGIN_USERNAME_MAX_ATTEMPTS=5
EDGE_EVER_AUTH_LOGIN_USERNAME_COOLDOWN_SECONDS=900
EDGE_EVER_AUTH_LOGIN_IP_MAX_ATTEMPTS=30
EDGE_EVER_AUTH_LOGIN_IP_COOLDOWN_SECONDS=300
```

然後運行：

```sh
bun run deploy:doctor
bun run deploy:manual
```

不要提交 `.env.local`，也不要把密碼寫入 D1。

## 啓用第三方 OSS 設置

如需在**設置 → 高級設置**中配置兼容 S3 API 的對象存儲，請先給已部署的 Worker 添加一個穩定的加密 Secret：

```sh
bunx wrangler secret put EDGE_EVER_STORAGE_ENCRYPTION_KEY
```

請使用至少 32 個字符的隨機值並安全備份。EdgeEver 會先加密外部 Secret Access Key，再將其保存到 D1。丟失或更換這個加密密鑰會導致之前保存的外部憑據無法使用。添加 Secret 後重新部署或重啓 Worker，然後先使用“測試連接”，再保存 OSS 配置。個人 AI 模型憑據會自動使用已有的實例認證 Secret，不需要配置這個變量。

## 故障恢復

- 數據庫未就緒：確認 D1 binding 爲 `DB`，然後運行 `bun run deploy:manual`。
- 鑑權未配置：在 `.env.local` 設置 `EDGE_EVER_AUTH_PASSWORD`，然後重新部署。
- 忘記管理員密碼：

  ```sh
  EDGE_EVER_PASSWORD='<新密碼>' bun run auth:reset-password -- --remote --username admin
  ```

## 自動更新

手動部署完成後，按 [Cloudflare Workers Builds](cloudflare-workers-builds.zh-CN.md) 配置自動部署，並在 Fork 的 **Actions** 中啓用 **Update deployed EdgeEver**。
