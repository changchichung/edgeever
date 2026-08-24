# Release 發佈指南

## 執行發佈

在 macOS 上從與 `origin/main` 一致且工作區乾淨的 `main` 分支執行：

```bash
bun run release -- \
  --bump patch \
  --issue-title "Improve the release workflow" \
  --label enhancement \
  --change-en "Run required release checks in parallel." \
  --change-zh "並行執行發佈所需檢查。" \
  --change-commit "abcdef1"
```

多項變化需要按組重複傳入 `--change-en`、`--change-zh` 和
`--change-commit`。一項變化可以關聯多個以逗號分隔的提交：

```bash
--change-commit "abcdef1,1234567"
```

上一個正式 Release 之後的每個提交都必須被覆蓋。不面向用戶的提交需要填寫
具體原因後顯式排除：

```bash
--ignore-commit "89abcde:僅增加測試覆蓋"
```

覆蓋審計在修改本地或 GitHub 狀態之前執行。映射記錄在跟蹤 Issue 中，不寫入
公開 Release 說明。公開說明只包含用戶可感知的變化、影響和必要的遷移提醒。

使用 `--dry-run` 查看提交覆蓋、原生端重建計劃和說明。發佈完成後不會下載、
安裝或啓動 macOS 應用；已安裝的桌面端通過應用內自動更新機制獲取新版。僅在
確實需要原有安裝驗收時顯式傳入 `--install-desktop`。

## EdgeEver 特有規則

- 正式 Tag 和 Release 標題使用 `vX.Y.Z`。`--bump` 須顯式指定，按 SemVer 選擇；
  禁止因發版節奏把用戶可感知的新能力或新平臺壓成 patch（詳見 `AGENTS.md`）。
- 根版本表示整體產品 Release。只有對應原生運行時重建時，才更新原生展示版本。
  Android `versionCode` 和 iOS Build Number 是相互獨立且嚴格遞增的標識。
- 每個正式 Release 包含 macOS arm64 與 x64 DMG、按架構區分的更新 ZIP，以及
  Android arm64 APK。未變化的原生資產沿用原文件名、版本和校驗和。
- 桌面端和 Android 更新檢查使用對應 Release 資產中記錄的版本，而不是整體
  GitHub Tag，避免僅涉及 Web 或 API 的 Release 觸發無效原生更新。
- 腳本負責創建跟蹤 Issue 和 Draft Release、驗證或複用原生資產、準備多架構
  Docker 鏡像並同時寫入 GHCR 與騰訊雲 TCR 公共鏡像、正式發佈、關閉 Issue，
  默認不安裝桌面端應用；安裝能力作爲顯式選項保留。
  輸出 Actions 鏈接後，Demo 部署會獨立繼續執行。
- 此命令不執行移動端商店交付，詳見
  [移動端商店交付](store-delivery.zh-CN.md)。

## 鏡像倉庫憑據

官方倉庫必須配置 `TENCENT_TCR_USERNAME` 和 `TENCENT_TCR_PASSWORD` 兩個
Actions Secret。對於 TCR 個人版，用戶名是騰訊雲賬號 ID，密碼是在 TCR 控制台
初始化的固定登錄密碼。Draft 準備階段會向 GHCR 與 TCR 寫入相同標籤；正式發佈
前會以匿名方式檢查兩個倉庫。

## 失敗與續跑

- 本地驗證、Draft 資產或 Docker 鏡像失敗時，Release 保持未發佈狀態。
- 中斷後重新執行相同命令，會續跑匹配的 Draft，不會重複創建 Issue、提交或
  Release。
- 發佈後的原生資產或 Docker 鏡像審計失敗時，腳本會嘗試將 Release 恢復爲
  Draft，並保留 Issue。
- 顯式安裝時若替換應用失敗，腳本會盡可能從 macOS 廢紙簍備份恢復上一版應用。
