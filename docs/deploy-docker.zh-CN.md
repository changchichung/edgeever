# 使用 Docker 部署 EdgeEver

EdgeEver 在 Cloudflare 與 Docker 中共用同一套 Web 應用、Hono 路由、業務服務、
鑑權、OpenAPI、MCP 實現和只增不改的 migration。兩種部署僅有薄運行入口和基礎
設施適配器不同：Docker 使用 Bun + SQLite + 本地文件（或 S3 兼容對象存儲），
Cloudflare 使用 Workers + D1 + R2。

## 環境要求

- Docker Engine 24 或更高版本，包含 Docker Compose v2。
- `amd64` 或 `arm64` Linux 主機。
- 實例離開可信局域網時，必須使用帶 HTTPS 的反向代理。

## 一鍵安裝

已安裝 Docker Compose v2 的主機可直接執行：

```sh
curl -fsSL https://edgeever-installer-1256854452.cos.ap-guangzhou.myqcloud.com/install.sh | bash -s -- --mirror tcr
```

腳本會創建 `~/edgeever`、生成管理員密碼、拉取 `latest`、啓動容器並等待健康
檢查通過。中國大陸命令從騰訊雲 COS 獲取腳本與 Compose 配置，並從騰訊雲 TCR
拉取鏡像。再次執行同一命令即可升級，已有密碼和 `/data` 卷保持不變。

默認情況下，腳本會通過當前用戶的 crontab 設置每日自動更新，於服務器本地時間
04:17 執行 `~/edgeever/update.sh`。更新程序會刷新 Compose 配置、拉取已配置的
鏡像標籤、按需重建服務並驗證容器健康狀態，運行記錄追加到
`~/edgeever/update.log`。默認的 `latest` 標籤會自動獲得新版本；通過 `--version`
指定的版本保持固定。使用 `--no-auto-update` 或
`EDGE_EVER_AUTO_UPDATE=false` 可關閉自動更新。如果系統沒有 `crontab`，安裝腳本
會保留 `update.sh`，並提示通過 NAS 的任務計劃程序執行。

海外服務器可去掉 `--mirror tcr` 使用 GHCR。按需使用 `--version vX.Y.Z`、
`--port PORT` 或 `--install-dir DIR`；執行以下命令可查看全部參數：

```sh
curl -fsSL https://edgeever-installer-1256854452.cos.ap-guangzhou.myqcloud.com/install.sh | bash -s -- --help
```

## 手動使用 Compose

下載 `compose.yaml`，選擇要運行的正式版本，並設置高強度實例密碼：

```sh
export EDGE_EVER_VERSION=vX.Y.Z
export EDGE_EVER_AUTH_PASSWORD='請替換爲足夠長的隨機密碼'
docker compose up -d
docker compose ps
```

打開 `http://localhost:8787`。只有共享的 `/api/health` 確認鑑權、SQLite 和對象
存儲均已就緒後，容器纔會進入 healthy 狀態。

### 鏡像地址

默認鏡像爲 `ghcr.io/tianma-if/edgeever`。中國大陸用戶可以切換到騰訊雲 TCR：

```sh
export EDGE_EVER_IMAGE=ccr.ccs.tencentyun.com/edgeever/edgeever
export EDGE_EVER_VERSION=vX.Y.Z
docker compose pull
docker compose up -d
```

騰訊雲公共鏡像無需執行 `docker login`，支持 `linux/amd64` 與 `linux/arm64`。
正式發佈會向 GHCR 和 TCR 同時寫入相同的版本標籤與 `latest` 多平臺鏡像；發佈
審計會拒絕缺失、滯後或內容不一致的鏡像。生產環境應通過
`EDGE_EVER_VERSION` 固定正式版本標籤。

Compose 會創建一個命名卷。所有需要在容器替換後保留的數據都位於 `/data`：

```text
/data/edgeever.sqlite       SQLite 數據庫
/data/resources/            本地圖片與附件
```

鏡像以非 root 的 `bun` 用戶運行（UID/GID 均爲 `1000`）。如果 NAS 必須使用主機
目錄綁定而不是命名卷，請先創建目錄，併爲 UID/GID `1000` 授予讀寫權限。
安裝或自動更新失敗時，腳本會對 `/data` 執行實際寫入測試，輸出掛載類型、來源、
容器用戶和目錄狀態。確認是權限問題後，還會根據 Docker 命名卷或 NAS 目錄綁定
給出對應的修復命令；腳本不會擅自修改現有數據的權限。

## 配置

常用環境變量：

| 變量 | 默認值 | 用途 |
| --- | --- | --- |
| `EDGE_EVER_AUTH_USERNAME` | `admin` | 初始管理員用戶名 |
| `EDGE_EVER_AUTH_PASSWORD` | 無 | 初始密碼；新數據庫必須提供 |
| `EDGE_EVER_AUTH_PASSWORD_HASH` | 無 | 可替代明文引導密碼的 PBKDF2 hash |
| `EDGE_EVER_SESSION_TTL_DAYS` | `400` | 登錄會話有效期 |
| `EDGE_EVER_IDLE_TIMEOUT_SECONDS` | `120` | Bun 流式響應空閒超時，可設爲 10 到 255 秒 |
| `EDGE_EVER_STORAGE_ENCRYPTION_KEY` | 無 | 加密保存的外部對象存儲憑據 |
| `EDGE_EVER_CREDENTIALS_ENCRYPTION_KEY` | 自動派生 | 可選的獨立 AI 憑據加密密鑰 |

Secret 可在受支持的變量名後追加 `_FILE`，並指向 Docker secret，例如
`EDGE_EVER_AUTH_PASSWORD_FILE=/run/secrets/auth_password`。密碼/hash、存儲加密
密鑰和 S3 訪問憑據均支持這種形式。同一個 Secret 不得同時設置直接變量與
對應的 `_FILE` 變量。

`EDGE_EVER_ALLOW_UNAUTHENTICATED=true` 僅用於隔離的開發環境，嚴禁將未鑑權
實例暴露到網絡。

## 使用 S3 兼容附件存儲

SQLite 仍保存在 `/data`，新附件可以寫入 MinIO、AWS S3、阿里雲 OSS、騰訊雲
COS、R2 或其他兼容服務：

```yaml
environment:
  EDGE_EVER_STORAGE_BACKEND: s3
  EDGE_EVER_S3_ENDPOINT: https://s3.example.com
  EDGE_EVER_S3_REGION: us-east-1
  EDGE_EVER_S3_BUCKET: edgeever
  EDGE_EVER_S3_ACCESS_KEY_ID_FILE: /run/secrets/s3_access_key
  EDGE_EVER_S3_SECRET_ACCESS_KEY_FILE: /run/secrets/s3_secret_key
  EDGE_EVER_S3_FORCE_PATH_STYLE: "true"
```

切換默認後端不會遷移歷史附件。在完成導出或遷移前，必須保持舊後端可用。

## HTTPS 與網絡暴露

容器在 `8787` 端口提供 HTTP。請使用維護活躍的 Caddy、Traefik 或 Nginx 終止
HTTPS，並轉發原始 Host 和客戶端地址。嚴禁公開 SQLite、`/data` 或對象存儲的
管理端口。

## 備份與恢復

可使用 EdgeEver ZIP 導出製作跨環境內容備份，同時應冷備份 `/data` 卷以支持
完整實例恢復：

1. 執行 `docker compose stop edgeever`，等待日誌出現 shutdown complete。
   EdgeEver 會在優雅停機時 checkpoint SQLite WAL。
2. 完整複製或快照命名卷，包括 SQLite 文件與 `resources` 目錄。
3. 執行 `docker compose start edgeever` 恢復服務。

請單獨備份 `EDGE_EVER_STORAGE_ENCRYPTION_KEY`，以及顯式配置的
`EDGE_EVER_CREDENTIALS_ENCRYPTION_KEY`。缺少這些密鑰時，卷備份無法解密已保存
的憑據。使用 S3 時還需獨立備份存儲桶。

只能在 EdgeEver 停止時恢復到空卷，並同時恢復匹配的 Secret。應定期在獨立
實例中驗證備份。

## 升級與回滾

生產環境應使用不可變的正式版本標籤，不要依賴 `latest`：

```sh
export EDGE_EVER_VERSION=vX.Y.Z
docker compose pull
docker compose up -d
docker compose ps
```

容器會在接收流量前應用與 D1 共用的 `migrations/*.sql`。升級前必須先備份。
回退應用鏡像不會逆向撤銷數據庫 migration；需要回退數據時，應恢復升級前的
卷備份。

在 Cloudflare 與 Docker 之間遷移時，請使用 EdgeEver 的完整備份/導出與恢復
流程。不要複製在線 D1 數據庫文件，也不要改寫 migration 歷史。

## 從源碼構建

```sh
docker build --tag edgeever:local .
docker run --rm -p 8787:8787 \
  -e EDGE_EVER_AUTH_PASSWORD='請替換爲足夠長的隨機密碼' \
  -v edgeever-data:/data \
  edgeever:local
```

Docker 首發版本不支持 PostgreSQL。它仍是未來的存儲適配器，不會形成另一套
業務代碼分支。
