export const productTimeline = [
  {
    date: "2026-07-03",
    title: "可配置筆記快捷入口",
    summary: "新增可配置的 note shortcuts，讓常用筆記和操作入口更容易被固定與複用。",
    commits: ["55d8e04"],
    highlights: ["配置化快捷入口", "繼續打磨高頻筆記工作流"],
  },
  {
    date: "2026-07-02",
    title: "README、演示環境與長期會話完善",
    summary:
      "集中更新產品使用指導、公開演示數據和登錄體驗；默認 Web session TTL 延長到 5 年，降低個人自託管場景的重複登錄成本。",
    commits: ["7369d94", "2c82e82", "746f3d9", "f937376", "21c1639"],
    highlights: ["產品 README 更新", "Demo reset 與預填登錄", "演示圖片種子資源", "5 年會話 TTL"],
  },
  {
    date: "2026-07-01",
    title: "Agent 與編輯體驗增強",
    summary:
      "MCP 能力繼續擴展，新增 memo listing tool；設置頁拆分組件，配置複製更清晰；編輯器工具欄、代碼塊和新建筆記響應也同步優化。",
    commits: ["dca1762", "8cd7ba2", "74b623c", "77122d6", "58f8453"],
    highlights: ["MCP memo listing tool", "AI Agent 部署流程優化", "設置頁組件拆分", "編輯器 toolbar tooltip", "多行代碼塊選擇修復"],
  },
  {
    date: "2026-06-30",
    title: "Evernote 遷移、MCP 配置與 PWA 穩定性",
    summary:
      "這一天是遷移與 Agent 接入的主線：Evernote ENEX 導入腳本加入 sharp 本地圖片壓縮與空文本預處理，MCP Token 配置複製流程完善，同時加入 PWA 更新提示和前後臺恢復刷新。",
    commits: ["d11171c", "631a3df", "02906eb", "7dd12e9", "e9136b2"],
    highlights: ["Evernote 導入腳本本地圖片壓縮", "ENEX 空文本預處理", "MCP 配置複製", "資源面板網格 / 搜索 / 拖拽上傳", "PWA resume 刷新"],
  },
  {
    date: "2026-06-29",
    title: "移動端筆記與 Evernote 遷移入口",
    summary:
      "移動端筆記閱讀、附件上傳、格式工具欄和新建筆記焦點細節持續打磨；同時引入 Evernote import flow 和遷移指南。",
    commits: ["69abf9b", "779784d", "64b254b", "16dce39", "a08f3d5"],
    highlights: ["移動端筆記視圖模式", "移動端附件上傳", "移動端格式工具欄", "Evernote import flow", "遷移指南入口"],
  },
  {
    date: "2026-06-28",
    title: "工作區重構與品牌視覺統一",
    summary:
      "Web 端從單體 App 結構重構爲模塊化組件，設置頁和資源頁變成工作區視圖；同時引入 shadcn/ui、EdgeEver 品牌色變量、移動端交互與性能拆包。",
    commits: ["b201d7d", "c0868dc", "e7ab278", "fa139b9", "2a0978a"],
    highlights: ["App.tsx 模塊化", "設置 / 資源全頁工作區", "EdgeEver brand variables", "初始 bundle 拆分", "筆記本排序選項"],
  },
  {
    date: "2026-06-27",
    title: "離線同步、MCP/CLI 文檔與三欄交互細化",
    summary:
      "新增離線同步和 Agent 文檔，強化 MCP/CLI 工作流；圍繞 Evernote 式筆記列表、選擇、pinning、移動端筆記本導航做了一輪交互打磨。",
    commits: ["377b7b9", "8ab55b7", "a40d85b", "a9478ea", "202e795"],
    highlights: ["離線同步", "MCP 與 CLI 使用文檔", "移動端筆記本導航", "筆記選擇與 pinning", "綠色主題調色"],
  },
  {
    date: "2026-06-26",
    title: "Cloudflare 自託管基礎成型",
    summary:
      "多實例部署、密碼登錄、Worker 兼容密碼 hash、PWA、搜索、回收站、修訂歷史、Agent Token 和 MCP CLI 接入在這一階段成型。",
    commits: ["da8ac14", "e2f9b66", "49646ca", "f7a144b", "fd2250b"],
    highlights: ["多實例 Cloudflare 部署", "密碼登錄", "PWA 支持", "自動保存 / 回收站 / 搜索", "Agent Tokens 與 MCP CLI"],
  },
];
