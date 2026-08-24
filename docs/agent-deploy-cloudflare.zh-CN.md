# AI Agent 在線部署 EdgeEver 約定

本文檔爲 AI Agent（以及自動化部署工具）在 Cloudflare 上在線部署 EdgeEver 的標準操作規範與約定。

> 💡 **核心原則**：純 Serverless 架構部署，基於 Cloudflare 免費配額運行，無需購買 VPS 或配置 Docker/SSL 證書。

---

## 自動化部署標準步驟

1. **Fork 倉庫**
   - Fork `tianma-if/edgeever` 到目標 GitHub 賬戶。

2. **啓用工作流**
   - 在 Fork 倉庫的 **Actions** 標籤頁中，啓用 **Update deployed EdgeEver** 自動更新工作流（公共 Fork 上定時任務默認關閉，必須手動啓用）。
   - 普通 Fork 默認作爲部署鏡像，無需配置任何更新變量：工作流會把所選上游 Release 的產品代碼快照應用到 `main`，再觸發 Cloudflare。
   - 更新器會把 Fork 自己的完整 `.github/workflows/**` 目錄及兩個更新輔助腳本作爲穩定的本地引導層保留。官方打包、簽名、測試與 Release 工作流繼續通過 `tianma-if/edgeever` 倉庫門禁限制執行，也不會被下游產品更新改寫。
   - 只有明確維護了應用代碼修改的 Fork，才應創建 Actions 倉庫變量 `EDGE_EVER_PRESERVE_FORK_CHANGES=true`。啓用後改爲 merge，並由倉庫所有者處理未來衝突；普通部署無需設置。

3. **Cloudflare 項目導入**
   - 登錄 Cloudflare **Workers & Pages** 控制台，導入該 Fork 倉庫。
   - 配置項目使用倉庫根目錄、生產環境 `main` 分支，並讀取倉庫根目錄下的 `wrangler.toml`。

4. **資源與憑據 (Resources & Secrets)**
   - 創建名稱嚴格爲 `edgeever` 的 D1 數據庫。
   - 創建名稱嚴格爲 `edgeever-resources` 的 R2 存儲桶。
   - **Worker Secret**：添加密鑰 `EDGE_EVER_AUTH_PASSWORD`，值爲初始管理員登錄密碼。
   - 該密碼只配置爲 Worker 運行時 Secret，不要複製到 Workers Builds 構建變量；標準部署入口會複用並驗證已存在的 Secret。
   - 不要修改 `wrangler.toml`，也不要在控制台重複添加 binding。部署命令會根據標準資源名稱生成 `DB` 與 `RESOURCES` binding。
   - 對按舊版文檔部署的已有 Worker，不要要求用戶重命名或重新配置自定義 R2 存儲桶。沒有顯式覆蓋時，部署會自動保留線上 `RESOURCES` binding 與管理員用戶名。

5. **配置 Workers Builds 命令**
   - 在 Cloudflare 項目的構建設置中，填入以下標準命令：

     ```text
     Build command: bun install --frozen-lockfile && EDGE_EVER_DEPLOYMENT_TRIGGER=main_push EDGE_EVER_DEPLOYMENT_METHOD=cloudflare_workers_builds bun run build:cloudflare
     Deploy command: bun run deploy:cloudflare-builds
     ```

   - 部署命令會根據 `edgeever` 數據庫名稱自動查詢 D1 UUID，並把所有實例參數僅寫入臨時生成的 Wrangler 配置。受版本控制的 `wrangler.toml` 必須保持不變；若把實例專屬配置提交到該文件，部署會直接拒絕，避免 Fork 因基礎設施配置產生分叉。
   - 請確保 Workers Builds API Token 具有 D1 讀取和編輯權限。高級非敏感自定義參數應放在 `EDGE_EVER_*` Workers Builds 構建變量中。如使用其他數據庫名稱，設置 `EDGE_EVER_D1_DATABASE_NAME`；僅在無法自動查詢 UUID 時設置 `EDGE_EVER_D1_DATABASE_ID`。密碼始終屬於運行時 Secret。

6. **啓動首次構建與服務驗證**
   - 觸發啓動首次構建，待構建部署完成後，進行如下自動化驗證：
     - 檢查 `https://<你的 Worker 域名>/api/health` 返回 `200` 狀態碼且 JSON 內容爲 `{"ok": true}`。
     - 檢查 `https://<你的 Worker 域名>/api/openapi.json` 能夠正常加載 OpenAPI 規範。
     - 使用用戶名 `admin` 和 `EDGE_EVER_AUTH_PASSWORD` 驗證登錄 API；若高級部署設置了 `EDGE_EVER_AUTH_USERNAME` 構建變量，則改用對應用戶名。

7. **驗證上游更新通道**
   - 在 Fork 的 **Actions** 中手動運行一次 **Update deployed EdgeEver**。即使 Fork 已對齊，手動運行也會重新發布所選版本，確保 Cloudflare 收到新的構建事件。
   - 打開 Job **Summary**，確認 Fork mode 爲 `mirror`，並顯示上游目標（stable Release 或 edge `main`），以及「已發佈更新」或明確的「已對齊」結果。
   - 若發生了 push，確認 Cloudflare **Deployments** 構建的是對應的 `main` commit。
   - 普通部署 Fork 不應修改部署文件，日常升級也不要依賴 GitHub **Sync fork**；本工作流就是唯一需要的同步路徑。只有舊 Fork 必須取得新版更新工作流本身時，才使用一次 **Sync fork**，之後繼續使用 **Update deployed EdgeEver**。
