# 自託管與 Docker 架構預留

EdgeEver 通過 Docker 支持 VPS、NAS 和家庭服務器自託管，同時不會形成第二套
產品實現。Cloudflare 與 Docker 執行同一個 Hono 應用，僅在薄運行入口和基礎
設施適配器邊界存在差異。

## 當前邊界

API 的業務邏輯和路由邏輯應依賴
`apps/api/src/storage-contract.ts` 中的存儲契約，而不是直接依賴
Cloudflare SDK 類型。目前的具體實現位於
`apps/api/src/cloudflare-storage-adapter.ts`：

- `DatabaseAdapter`：SQL 語句與批處理。
- `BlobStoreAdapter`：附件的 `get`、`put` 和 `delete` 操作。

Cloudflare 將 D1/R2 適配器注入 `fetchEdgeEverApp`；Bun 入口則向同一個函數
注入 SQLite/文件系統或 SQLite/S3 適配器。兩個入口均不得包含路由或業務判斷。

共享的自託管配置結構定義爲 `SelfHostedStorageConfig`，包含統一的應用
數據目錄、SQLite 數據庫文件和附件目錄。

PostgreSQL 已通過與驅動無關的 `RelationalDatabaseAdapter` 和
`PostgreSQLStorageConfig` 契約預留爲第二種關係數據庫後端，但當前尚未實現。
SQLite 仍是自託管默認數據庫；未來 PostgreSQL 更適合較大團隊、更高寫入併發
以及獨立數據庫運維場景。

## Docker 形態

正式支持的容器部署爲單應用容器，只需掛載一個持久化 `/data` 目錄：

```text
EdgeEver 容器
├── SQLite 數據庫       -> /data/edgeever.sqlite
└── 附件存儲             -> /data/resources
```

自託管適配器繼續複用現有 SQLite 結構和 `migrations/*.sql`；附件繼續使用
`resources.object_key` 中保存的不透明對象鍵。運行入口支持本地文件系統和
S3 兼容對象存儲兩種後端。

未來實現 PostgreSQL 時，必須明確處理 SQL 方言以及 PostgreSQL 專用的全文搜索
和事務行爲，並提供獨立遷移策略，不能讓現有 SQLite/D1 migration 文件產生歧義。

## 兼容性要求

- 保持 `/api/*`、`/mcp`、`/api/openapi.json` 和 `/api/health` 不變。
- 繼續追加 `migrations/*.sql`，禁止爲 Docker 分叉數據庫結構。
- 根密鑰必須通過環境變量或 Docker secrets 注入，不能寫入鏡像或數據庫。對象存儲 Secret 使用 `EDGE_EVER_STORAGE_ENCRYPTION_KEY`；個人 AI 模型 API Key 默認從已有實例認證 Secret 派生 AI 專用密鑰，高級密鑰輪換場景可選用 `EDGE_EVER_CREDENTIALS_ENCRYPTION_KEY` 覆蓋。所有憑據在數據庫中只能保存爲 AES-GCM 密文。
- 將 `/data` 作爲唯一必需的應用持久化路徑，方便 NAS 用戶備份一個卷。
- 容器入口需要支持 `EDGE_EVER_AUTH_USERNAME`、`EDGE_EVER_AUTH_PASSWORD` 和
  會話配置，同時不能把 Cloudflare 專有配置當作前置條件。
- 登錄暴力破解防護必須使用應用層的 SQLite/D1 兼容存儲實現；Cloudflare
  Rate Limiting 和 WAF 只能作爲部署層的可選增強，不能作爲運行前提。
- 健康檢查應區分進程可用、數據庫就緒和附件存儲就緒。

Secret、HTTPS、備份、升級與 NAS 權限等運維說明請查看
[使用 Docker 部署 EdgeEver](deploy-docker.zh-CN.md)。

Docker 鏡像與本地開發共用同一個 Bun 運行入口：

```sh
bun run build:web
EDGE_EVER_AUTH_PASSWORD='<強密碼>' bun run start:self-hosted
```

可通過 `EDGE_EVER_DATA_DIR` 指定需要由 Docker 或 NAS 卷持久化的目錄。
長時間流式響應默認使用 120 秒空閒超時。可將
`EDGE_EVER_IDLE_TIMEOUT_SECONDS` 設置爲 10 到 255 之間的值進行覆蓋。

同一個入口也可以使用 S3 兼容對象存儲：

```sh
EDGE_EVER_STORAGE_BACKEND=s3 \
EDGE_EVER_S3_ENDPOINT='http://minio:9000' \
EDGE_EVER_S3_REGION='us-east-1' \
EDGE_EVER_S3_BUCKET='edgeever' \
EDGE_EVER_S3_ACCESS_KEY_ID='<access-key>' \
EDGE_EVER_S3_SECRET_ACCESS_KEY='<secret-key>' \
bun run start:self-hosted
```

實現使用 `@aws-sdk/client-s3`，Cloudflare Worker 入口不會加載該 SDK。
