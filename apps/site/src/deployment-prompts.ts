export const deploymentPrompts = {
  "en-US": `Deploy EdgeEver online:
1. Fork https://github.com/tianma-if/edgeever.
2. Import the Fork into Cloudflare Workers & Pages.
3. Create D1 \`edgeever\` and R2 \`edgeever-resources\`, set the
   \`EDGE_EVER_AUTH_PASSWORD\` Worker Secret, and configure the production \`main\` build.
4. Start the first build and verify \`/api/health\`, \`/api/openapi.json\`, and login.
5. Enable and manually run the GitHub Actions workflow named \`Update deployed EdgeEver\`
   once so the Fork can automatically receive the latest EdgeEver features and fixes.`,
  "zh-CN": `請在線完成 EdgeEver 部署：
1. Fork https://github.com/tianma-if/edgeever。
2. 將這個 Fork 導入 Cloudflare Workers & Pages。
3. 創建 D1 \`edgeever\` 與 R2 \`edgeever-resources\`，設置
   \`EDGE_EVER_AUTH_PASSWORD\` Worker Secret，並配置生產環境 \`main\` 構建。
4. 啓動首次構建，驗證 \`/api/health\`、\`/api/openapi.json\` 和登錄。
5. 啓用並手動運行一次名爲 \`Update deployed EdgeEver\` 的 GitHub Actions 工作流，
   以便後續自動同步更新，持續獲得 EdgeEver 最新的產品特性和問題修復。`,
} as const;

export const manualDeploymentCopy = {
  "en-US": {
    intro: "Complete setup in 5 simple web steps:",
    steps: [
      {
        title: "Fork the Repository",
        body: "Click Fork at the top right of GitHub to fork EdgeEver into your personal account.",
      },
      {
        title: "Enable Actions",
        body: "Open the Fork's Actions tab and click I understand my workflows, go ahead and enable them so the GitHub Actions workflow named Update deployed EdgeEver can run automatically, keeping you up to date with the latest EdgeEver features and fixes.",
      },
      {
        title: "Import into Cloudflare",
        body: "Log into the Cloudflare Dashboard, navigate to Workers & Pages, and choose to import your Fork repository.",
      },
      {
        title: "Create Resources & Credentials",
        body: "Create D1 edgeever and R2 edgeever-resources, then set the Worker Secret EDGE_EVER_AUTH_PASSWORD as your admin password. The deploy command creates the bindings; do not edit Fork files.",
      },
      {
        title: "Build & Verify",
        body: "Start the first build with default settings. Once complete, visit /api/health to verify a 200 response before logging in.",
      },
    ],
  },
  "zh-CN": {
    intro: "僅需在網頁端完成 5 步極簡配置：",
    steps: [
      {
        title: "Fork 倉庫",
        body: "在 GitHub 點擊右上角 Fork，將項目 Fork 到您的個人賬戶下。",
      },
      {
        title: "啓用 Actions",
        body: "進入 Fork 的 Actions 標籤頁，點擊 I understand my workflows, go ahead and enable them，確保名爲 Update deployed EdgeEver 的 GitHub Actions 工作流能夠自動運行，從而持續獲得 EdgeEver 最新的產品特性和問題修復。",
      },
      {
        title: "導入 Cloudflare",
        body: "登錄 Cloudflare 控制台，進入 Workers & Pages，選擇導入該 Fork 倉庫。",
      },
      {
        title: "創建資源與登錄憑據",
        body: "創建 D1 edgeever 與 R2 edgeever-resources，並添加 Worker Secret EDGE_EVER_AUTH_PASSWORD 作爲管理員登錄密碼。binding 由部署命令生成，不要修改 Fork 中的文件。",
      },
      {
        title: "啓動構建與驗證",
        body: "使用默認構建配置啓動首次構建，部署完成後訪問 /api/health 確認返回 200 即可開始使用。",
      },
    ],
  },
} as const;
