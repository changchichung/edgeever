# 移動端商店交付

GitHub Release 與移動端商店交付是兩個獨立操作：

- `bun run release` 只創建並審計 GitHub Release，不會訪問 Google Play 或
  App Store Connect。
- `bun run publish:stores` 針對一個已經存在的正式 Release tag，觸發手動商店
  交付工作流。
- 觸發商店交付就代表已經授權正式提交。默認情況下，Google Play 使用
  Production 軌道；iOS 在上傳 App Store Connect 後繼續提交 App Review。審覈
  通過後自動發佈。

## 安全模型

工作流檢出不可變的 Release tag，而不是 `main`。開始任何商店構建前都會驗證：

- tag 屬於正式、非 Prerelease 的 GitHub Release；
- Release 目標提交與 Git tag 指向同一個提交；
- 與上一個正式 Release 相比，審計範圍內確實包含移動端運行時代碼變化；
- 根版本和移動端 App 版本都與 Release tag 一致；
- Android `versionCode` 已遞增。

如果某個 Release 複用了上一版移動端二進制，工作流會主動拒絕。它不代表新的
商店二進制，不應重複上傳。

## 前置配置

在 GitHub 倉庫中配置以下 Secrets：

- `EXPO_TOKEN`
- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`
- `ANDROID_PLAY_APP_SIGNER_SHA256`
- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_BASE64`
- `APP_STORE_CONNECT_API_KEY_ID`
- `APP_STORE_CONNECT_API_ISSUER_ID`
- `APP_STORE_CONNECT_API_KEY_P8_BASE64`

將 Google Play 服務賬號密鑰上傳到 Android 應用的 EAS Submit Credentials，
同時將同一份服務賬號 JSON 以 base64 保存到上述倉庫 Secret，並把 Play Console
中的**應用簽名證書**（不是上傳證書）SHA-256 指紋保存爲
`ANDROID_PLAY_APP_SIGNER_SHA256`。在 EAS 中配置 iOS 分發憑據和 App Store
Connect API Key。憑據和私鑰禁止提交到倉庫。

創建以下 GitHub Environments：

- `store-delivery`：用於 Android 測試軌道和 Apple App Review 交付。
- `store-production`：用於 Google Play Production 交付。

EAS Submit 要求應用已經在對應商店中創建；Google Play API 提交還要求服務賬號
擁有該應用的訪問權限。配置方法參考官方
[EAS Android 提交指南](https://docs.expo.dev/submit/android/)和
[EAS Submit 配置參考](https://docs.expo.dev/submit/eas-json/)。

## 命令

同時提交 Google Play Production 和 Apple App Review：

```sh
bun run publish:stores -- --release v1.7.0
```

只將 Android 交付到封閉測試軌道：

```sh
bun run publish:stores -- \
  --release v1.7.0 \
  --platform android \
  --android-track beta
```

使用 `--dry-run` 可以只輸出將要觸發的 GitHub 工作流，不實際啓動。

## 各平臺行爲

### Google Play

自託管發佈 Runner 會從指定 tag 構建僅含 `arm64-v8a` 的簽名 AAB，驗證簽名和
R8 Mapping，將兩者保留爲 GitHub Actions Artifacts，然後通過 EAS Submit 上傳
AAB。

Google Play 處理完 AAB 後，工作流會下載由 Play 應用簽名密鑰簽名的通用 APK，
覈對固定的應用簽名證書，並替換 GitHub Release 中的 Android 資產。這樣從 Play
和 GitHub 安裝的版本可以互相覆蓋升級。上傳的 AAB 會明確限制爲
`arm64-v8a`，因此 Play 生成的通用 APK 不會再打包無用的 32 位 ARM 或 x86
原生庫。該 Release 必須關閉 Automatic Protection；當 Play 返回帶安裝來源限制
的產物時，下載器會直接失敗，防止此類 APK 再次發佈到 GitHub 供側載。

Internal、Alpha、Beta 和 Production 配置都會在所選軌道創建 Completed
Release。默認命令直接使用 Production；只有明確要求測試交付時才使用
`--android-track internal`、`alpha` 或 `beta`。

### App Store Connect

原生 iOS 商店二進制來自 **`apps/ios`**（SwiftUI），不再走 Expo EAS。
在 macOS beta 本機上，Archive 必須通過 **Xcode Cloud**（僅手動觸發的 Archive
工作流），保證 `BuildMachineOSBuild` 來自正式系統鏡像——見
[iOS Xcode Cloud](ios-xcode-cloud.md)。Cloud 用產品「下一個構建版本編號」寫入
`CFBundleVersion`；配置共享環境變量後，`ci_post_xcodebuild.sh` 會用
App Store Connect API Key 上傳 App Store IPA。隨後 Fastlane（`apps/ios` 的
`submit_review`）精確選擇相同的 App Version 與 Build Number，提交 App Review，
並設置爲審覈通過後自動發佈。元數據、協議、審覈信息或憑據不完整時工作流會失敗，
不會改爲提交其他構建。
