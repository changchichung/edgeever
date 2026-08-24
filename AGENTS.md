# AGENTS.md

本文件用於約束和指導參與本項目的 AI 代理與協作者。

## 文檔與分支約束

- **技術棧與背景**：優先參考 `README.md`。
- **移動端平臺邊界**：Android 客戶端位於 `apps/mobile`，使用 Expo / React Native 實現；iOS 客戶端位於 `apps/ios`，使用 Swift / SwiftUI 原生實現。
- **雙語同步**：修改中文文檔時必須同步更新對應的英文文檔。
- **分支規範**：嚴禁創建新分支，所有修改與提交必須直接在 `main` 分支上完成。

## GitHub Actions 與 Release 約束及流程

1. **Fork 工作流邊界**：配置 GitHub Actions 時必須考慮大量用戶會 Fork 倉庫進行自部署；僅官方倉庫需要的 Job 必須使用 `github.repository == 'tianma-if/edgeever'` 門禁，嚴禁在下游 Fork 中分配 Runner 或執行。
2. **版本號與基線**：`vX.Y.Z`（非 Draft/Prerelease）。發佈須顯式 `--bump patch|minor|major`（腳本不自動選級）；按 SemVer 選擇，**禁止因發版節奏把用戶可感知的新能力或新平臺壓成 patch**。遞增根目錄 `package.json`；含移動端修改時同步 `apps/mobile/app.json` 的 `expo.version` 並遞增 `android.versionCode`。上一個正式 Release 爲審計基線。
3. **跨平臺 Release 資產**：每個正式 Release 頁面必須同時包含 macOS arm64 DMG、macOS x64 DMG 和 Android arm64 APK。若本次未修改對應原生運行時代碼、依賴、配置或構建工具，直接複用上一個正式 Release 中已驗證的原始資產，保留原文件名與校驗和，禁止僅爲匹配新版本號而重命名。
4. **驗證命令**：必須通過 `bun run typecheck`、`bun run typecheck:mobile` 和 `bun run build:web`。
5. **測試職責邊界**：正式 Release 必須先在官方倉庫及與下游一致的 Ubuntu 環境通過完整非 E2E 測試，嚴禁將上游自身的測試失敗轉嫁給下游 Fork 發現。只讀部署 Fork 僅同步產品快照且不運行測試；只有顯式保留定製改動的 Fork 才驗證合併結果，失敗時必須保持 `main` 與生產環境不變。
6. **原生資產構建與複用**：由 `scripts/plan-native-release.mjs` 決定重建或複用；桌面資產包含 `apps/web`。修改判定規則時同步更新測試。移動端重建使用 `bun run build:android:apk:local`，簽名配置保存在倉庫外。
7. **Draft 內準備資產**：通過帶 `release_tag` 的 `workflow_dispatch` 在 Draft 中準備並驗證資產；`published` 事件只審計，禁止重新構建或上傳。
8. **桌面驗證職責**：桌面 Release 工作流負責測試、包結構檢查、簽名與公證；代理不再重複下載 Draft 或執行本地首次啓動驗收，除非用戶明確要求。
9. **發佈後更新**：正式發佈後，發佈流程默認不得下載、覆蓋安裝或啓動 `/Applications/EdgeEver.app`；已安裝的桌面端通過應用內自動更新機制獲取新版。僅在用戶明確要求時使用 `--install-desktop` 執行原有安裝驗收，功能體驗由用戶在實際使用中驗證。
10. **失敗處理**：工作流或資產審計失敗時保持或恢復 Draft，修復後重跑；不得公開已知損壞的 Release。
11. **Release 說明結構**：使用中英文雙語格式（正文禁止包含字面量 `\n`），只寫用戶可感知的變化、影響以及必要的升級或遷移提醒。類型檢查、構建命令、簽名、公證、資產複用等技術驗證細節保留在 Actions 和關聯 Issue 中，不寫入公開 Release 正文。功能/修復關聯對應 Issue 並標記 Label，發佈後回鏈並關閉 Issue。正文結構：

```md
## 🇨🇳 中文說明 / Chinese Changelog

## 主要更新

- 面向用戶說明本次變化及影響。

關聯 Issue：#<issue-number>

## Key Changes

- User-facing summary of changes in English.

Related Issue: #<issue-number>
```

## 環境、部署與組件約束

- **Cloudflare 部署**：嚴格按 `docs/agent-deploy-cloudflare.md` 執行。
- **跨運行時架構**：項目未來將正式支持 Docker 自託管；實現新功能時必須保持業務邏輯與 Cloudflare 解耦，併爲其他運行時預留擴展邊界。Cloudflare 與 Docker 必須共用同一套業務代碼，僅允許保留薄且穩定、不包含業務判斷的運行入口和基礎設施驅動適配器。
- **數據庫 Migration**：數據庫或種子變化時，在 `migrations/` 下新增遞增編號 SQL，禁止修改已執行的舊 Migration。
- **本地啓動**：默認 `bun run dev`（純本地環境）；指定遠程實例用 `EDGE_EVER_INSTANCE=<實例名> bun run dev:remote`；純前端用 `bun run dev:web`。
- **Demo 示例同步**：修改示例筆記後，在 `main` 分支幹淨狀態下執行 `bun run demo:sync` 重置公開 Demo。
- **禁止重複造輪子**：嚴禁重複實現已有成熟方案；優先採用維護活躍、廣泛驗證的開源組件與依賴，並優先複用 `shadcn/ui`；複雜或重複模塊封裝爲獨立組件。
- UI和交互的原則是，產品始終表現得可靠、可預測、確定、被接住。
- **懸停提示**：所有懸停或聚焦提示嚴禁使用 HTML 原生 `title`；Web 端必須統一使用 shadcn/ui 的 Tooltip 組件，並確保鍵盤聚焦時同樣可見。

## 品牌視覺規範 / Brand Identity

- **品牌色**：主綠色 `#16A06E`，Logo 圖形色 `#07130B`。
- 修改 Logo 後執行 `bun run prepare:brand:icons` 同步各平臺資源。
