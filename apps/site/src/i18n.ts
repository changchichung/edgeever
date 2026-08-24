import { deploymentPrompts } from "./deployment-prompts";

export type SiteLocale = "zh-CN" | "en-US";

export const defaultSiteLocale: SiteLocale = "zh-CN";
export const siteLocaleStorageKey = "edgeever.site.locale";
export const siteLocaleDataAttribute = "data-edgeever-site-locale";
export const siteTaglines = {
  "zh-CN": "無需服務器、零費用、開源且原生支持 AI Agent 的自託管『印象筆記』替代品",
  "en-US": "A serverless, 100% free, open-source, and AI-native self-hosted Evernote alternative on Cloudflare.",
} as const satisfies Record<SiteLocale, string>;

export const getSiteLocale = (pathname: string): SiteLocale => (pathname === "/en" || pathname.startsWith("/en/") ? "en-US" : "zh-CN");

export const getLocalizedPath = (locale: SiteLocale, path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (locale === "zh-CN") {
    return normalizedPath === "/en" ? "/" : normalizedPath.replace(/^\/en(?=\/|$)/, "") || "/";
  }

  if (normalizedPath === "/") {
    return "/en/";
  }

  return normalizedPath.startsWith("/en/") ? normalizedPath : `/en${normalizedPath}`;
};

export const siteCopy = {
  "zh-CN": {
    layout: {
      defaultDescription:
        "EdgeEver 是一個開源、自託管、Cloudflare-native 的現代筆記工作區。保留經典印象筆記的三欄體驗，支持富文本、無限嵌套，對 AI Agent 極度友好。採用無服務器架構，日常使用完全免費且無需服務器。",
      defaultTitle: `EdgeEver - ${siteTaglines["zh-CN"]}`,
      imageAlt: "EdgeEver 筆記應用截圖",
      ogLocale: "zh_CN",
    },
    nav: {
      homeAria: "EdgeEver 首頁",
      features: "功能特性",
      guides: "使用指南",
      deploy: "部署",
      migration: "從印象筆記遷移",
      evernoteMigration: "從印象筆記遷移",
      memosMigration: "從 Memos 遷移",
      notionMigration: "從 Notion 遷移",
      advancedPlay: "搭配AI Agent的玩法",
      blog: "博客",
      contact: "聯繫我們",
      privacy: "隱私政策",
      demo: "在線演示",
      language: "語言",
      languageMenu: "切換語言",
      tagAll: "全部",
      tagMigration: "遷移教程",
      tagMcp: "AI 協同 (MCP)",
      tagSelfHosted: "部署自託管",
      openSource: "開源",
    },
    hero: {
      slogan: siteTaglines["zh-CN"],
      popHighlight: "印象筆記 0 成本經典平替",
      demo: "在線演示",
      agentInstall: "一鍵 AI 部署",
      imageAlt: "EdgeEver product preview",
      badgeText: "💡 支持印象筆記、Notion、Memos 零成本平替，雙 MCP 自動搬家",
      terminalCmd: "幫我在 Cloudflare 部署 EdgeEver：Fork https://github.com/tianma-if/edgeever 並綁定 D1/R2",
      terminalSub: "Agent 原生 · 複製 Prompt 粘貼給 Cursor / Claude Code / Antigravity 即可自動部署",
      copySuccess: "部署 Prompt 已複製！粘貼給 AI 助手即可部署",
      agentPromptText: deploymentPrompts["zh-CN"],
    },
    bento: {
      eyebrow: "WHY EDGEEVER",
      heading: "重新定義自託管筆記工作區",
      subheading: "告別商業筆記的臃腫廣告與設備限制。每一個設計細節，都旨在打造流暢、開放、隱私可控的第二大腦。",
      card1: {
        badge: "經典重現",
        title: "經典三欄，熟悉但更輕快",
        desc: "保留印象筆記式的筆記本樹、筆記列表與主編輯區。支持無限層級嵌套與拖拽調整，零學習成本。",
        subBadge: "100% 經典印象筆記體感",
        treeTitle: "筆記本目錄",
        folder1: "01_工作收件箱",
        folder2: "02_靈感與草稿",
        folder3: "03_歸檔筆記",
        folder4: "↳ 2026_閱讀精選",
        listTitle: "筆記 (18)",
        note1Title: "EdgeEver 核心架構設計",
        note1Sub: "基於 Cloudflare Worker + D1...",
        note2Title: "Remote MCP 配置指南",
        note2Sub: "Antigravity Token 校驗步驟...",
        editorTitle: "EdgeEver 核心架構設計",
        editorBody: "EdgeEver 將印象筆記經典的 3 欄工作區與 100% 免費的 Serverless 架構完美結合。",
        editorSaveTag: "已自動保存至 Cloudflare D1",
      },
      card2: {
        badge: "MCP 原生",
        title: "AI Agent 原生連接",
        desc: "內置 Remote MCP endpoint。直接授權 Antigravity、Claude Code、Codex 讀取、生成與整理你的長期知識庫。",
        mockupStatus: "MCP 已連接",
        mockupCmd: "> mcp.search_notes(\"EdgeEver\")",
        mockupResult: "已找到 5 條相關筆記，已自動生成摘要與標籤關聯。",
      },
      card3: {
        badge: "0 成本自託管",
        title: "0 服務器、0 運維、終身完全免費",
        desc: "依託 Cloudflare 架構，可存 15 萬條筆記 + 5 萬張圖片。數據存在你自己的 Cloudflare 賬號中，隱私安全無憂。",
        price: "¥0",
        unit: "/ 月",
        sub: "自託管零服務器成本",
        metric: "150,000+",
        metricSub: "免費筆記容量",
      },
      card4: {
        badge: "排版神器",
        title: "創作者一鍵富文本美化複製",
        desc: "專爲創作者打造，Markdown 瞬間轉換爲帶內聯 CSS 的優雅排版，可直接粘貼至 Substack、Medium 或公衆號。",
        srcTag: "Markdown 源碼",
        actionBtn: "一鍵富文本複製",
        previewTitle: "# 標題一：富文本與 CSS",
        previewBody: "帶 CSS 內聯排版，瞬間粘貼入公衆號或 Substack。",
      },
      card5: {
        badge: "數據主權",
        title: "數據開放，無損 ZIP 備份",
        desc: "基於 SQLite D1 與標準 REST API，支持無損 ZIP 導入導出（含 Markdown、Front Matter、嵌套目錄與版本歷史）。",
        archiveTitle: "edgeever-backup.zip",
        archiveSub: "包含 Markdown、Front Matter、附件與歷史版本",
      },
    },
    marquee: {
      title: "無縫剪藏、多端同步與生態擴展",
      subtitle: "從瀏覽器剪藏插件、PWA/移動端隨手記，到 Remote MCP 與跨平臺數據聯動",
      items: [
        {
          tag: "剪藏插件",
          title: "Chrome、Edge 與 Firefox",
          desc: "Chrome 官方商店版本與 Firefox 兼容構建，智能剪藏網頁全文、選中文本與書籤",
          icon: "bx:bx-extension",
          color: "from-emerald-500/10 to-teal-500/5",
        },
        {
          tag: "多端同步",
          title: "PWA & 移動端快捷記",
          desc: "桌面 PC、iOS、Android 隨開隨用，離線草稿自動同步",
          icon: "bx:bx-mobile-alt",
          color: "from-teal-500/10 to-emerald-500/5",
        },
        {
          tag: "設備無界",
          title: "不限設備登錄數",
          desc: "自建專屬 API，徹底打碎商業筆記“限制 2 臺設備”枷鎖",
          icon: "bx:bx-devices",
          color: "from-emerald-600/10 to-green-500/5",
        },
        {
          tag: "AI 生態",
          title: "Remote MCP 服務端",
          desc: "原生接入 Antigravity、Claude Code、Codex 智能讀寫與總結",
          icon: "bx:bxs-bot",
          color: "from-green-500/10 to-emerald-500/5",
        },
        {
          tag: "數據聯動",
          title: "Notion & 飛書多維表格",
          desc: "通過 MCP 把零散筆記自動歸納轉化爲結構化數據庫",
          icon: "bx:bx-data",
          color: "from-teal-600/10 to-emerald-600/5",
        },
        {
          tag: "創作者高效",
          title: "Substack / 公衆號複製",
          desc: "Markdown 瞬間轉換爲帶 CSS 內聯的完美富文本排版",
          icon: "bx:bx-copy",
          color: "from-emerald-500/10 to-teal-500/5",
        },
        {
          tag: "無損遷移",
          title: "雙 MCP & 印象筆記搬家",
          desc: "內置 ENEX 與雙 MCP 自動化遷移工具，輕鬆無痛轉場",
          icon: "bx:bx-transfer",
          color: "from-green-600/10 to-teal-500/5",
        },
        {
          tag: "數據主權",
          title: "無損 ZIP 離線歸檔",
          desc: "SQLite D1 完整打包導出/導入，支持 Markdown 與版本歷史",
          icon: "bx:bx-archive",
          color: "from-teal-500/10 to-emerald-500/5",
        },
      ],
    },
    features: {
      heading: "重新定義個人筆記體驗",
      items: [
        {
          title: "零服務器，零運維，終身完全免費",
          summary: "徹底告別購買雲服務器月租與繁瑣維護。利用 Cloudflare 卓越的無服務器架構，個人使用終身免費。",
          points: [
            "完全免服務器：無需配置 Docker、Nginx 或證書，一句話即可直接部署至 Cloudflare。",
            "日常使用完全免費：充分利用 Cloudflare Workers、D1 與 R2 免費級配額（可存 15 萬條筆記 + 5 萬張圖片）。",
            "數據安全盡在掌握：雖然免服務器，但數據並非存在第三方，而是保存在你自己的 Cloudflare 賬號中。",
          ],
        },
        {
          title: "AI Agent 原生連接",
          summary: "內置 REST API、OpenAPI schema 與 Remote MCP endpoint，讓 AI 助手安全地讀取、創建和整理筆記。",
          points: [
            "在應用內生成 MCP Token，就能把 EdgeEver 接入 Codex、Claude Code、Antigravity 等工具。",
            "適合做靈感歸納、自動打標籤、知識圖譜整理和跨筆記檢索。",
            "還可以聯動 Notion Database、飛書多維表格等工具，把日常筆記中的零散信息沉澱爲結構化數據。",
            "API 與 Agent 能力圍繞你的私有實例工作，不依賴封閉筆記平臺。",
          ],
        },
        {
          title: "經典三欄，熟悉但更輕快",
          summary: "保留印象筆記式的筆記本樹、筆記列表和主編輯區，減少遷移後的學習成本。",
          points: [
            "支持無限級嵌套筆記本，適合長期沉澱的大型知識庫。",
            "筆記本可以拖拽排序和調整層級，筆記支持多選移動與多選合併。",
            "基於 TipTap 的富文本編輯器支持查看筆記歷史版本，兼顧流暢寫作與內容回溯。",
          ],
        },
        {
          title: "數據開放，遷移和導出不被綁架",
          summary: "筆記內容以結構化 JSON、Markdown 與純文本多形態保存，並支持原生 EdgeEver ZIP 導入導出，兼顧編輯、API、搜索、Agent 與完整恢復。",
          points: [
            "內容存放在基於標準 SQLite 的 Cloudflare D1 中，可通過 API、MCP 或 CLI 按需讀取。",
            "支持原生 EdgeEver ZIP 導入導出，歸檔包含 Markdown、Front Matter、嵌套筆記本結構、附件與歷史版本，可跨實例完整恢復。",
            "支持印象筆記數據導入能力，降低從舊筆記庫遷移過來的成本。",
            "Markdown 面向導入導出和 Agent 使用，降低未來再次遷移的成本。",
          ],
        },
        {
          title: "多端無縫同步，不限設備數",
          summary: "電腦、手機、平板都能直接同步，自建實例讓你徹底擺脫商業筆記平臺的登錄設備數限制。",
          points: [
            "不限登錄設備數：個人獨享自建 API，再也不受商業筆記平臺的“只允許登錄 2 臺設備”等限制。",
            "支持 PC 與移動端網頁訪問，也可以安裝成 PWA，隨手打開就能記。",
            "已有筆記支持離線編輯草稿和本地同步隊列，弱網時也能先寫後同步。",
          ],
        },
        {
          title: "一個實例，多賬戶獨立空間",
          summary: "爲家人或小團隊成員創建賬號，每個人都擁有彼此隔離的私人筆記工作區。",
          points: [
            "實例管理員可以創建、停用成員賬號或重置密碼，實例不開放公衆註冊。",
            "每個成員的筆記本、筆記、附件、回收站和導入導出數據完全隔離。",
            "MCP Token 也按成員空間隔離，AI Agent 只能訪問被明確授權的數據。",
          ],
        },
      ],
    },
    guides: {
      eyebrow: "EdgeEver Guides",
      heading: "從部署、遷移到 AI Agent 玩法",
      description: "快速上手 EdgeEver 的核心路徑：部署專屬實例、無縫遷移舊筆記，並通過 MCP 接入 AI 助手構建第二大腦。",
      items: [
        {
          title: "兩種方式部署 EdgeEver",
          summary: "讓 AI Agent 代爲完成線上部署，或手動 Fork 後在線配置同一套流程。",
          href: "/blog/ai-agent-deploy-cloudflare",
          cta: "查看部署指南",
        },
        {
          title: "從印象筆記遷移",
          summary: "通過 EdgeEver MCP、evernote-backup 和 ENEX 導入腳本，把舊筆記庫遷移到自託管實例。",
          href: "/blog/evernote-migration-guide",
          cta: "查看遷移指南",
        },
        {
          title: "AI Agent 進階玩法",
          summary: "用 MCP 讀取真實筆記，生成知識地圖、標籤建議和個人資料整理工作流。",
          href: "/guides/advanced-play",
          cta: "查看玩法",
        },
      ],
    },
  },
  "en-US": {
    layout: {
      defaultDescription:
        "EdgeEver is a free, open-source, self-hosted Evernote alternative with a familiar three-pane workspace, open data, web clipping, sync, and AI agent support.",
      defaultTitle: "Open-Source, Self-Hosted Evernote Alternative | EdgeEver",
      imageAlt: "EdgeEver notes app screenshot",
      ogLocale: "en_US",
    },
    nav: {
      homeAria: "EdgeEver home",
      features: "Features",
      guides: "Guides",
      deploy: "Deploy",
      migration: "Migrate from Evernote",
      evernoteMigration: "Migrate from Evernote",
      memosMigration: "Migrate from Memos",
      notionMigration: "Migrate from Notion",
      advancedPlay: "AI Agent plays",
      blog: "Blog",
      contact: "Contact",
      privacy: "Privacy",
      demo: "Demo",
      language: "Language",
      languageMenu: "Change language",
      tagAll: "All",
      tagMigration: "Migration",
      tagMcp: "AI & MCP",
      tagSelfHosted: "Deployment",
      openSource: "Open Source",
    },
    hero: {
      slogan: siteTaglines["en-US"],
      popHighlight: "Free Self-Hosted Evernote Alternative",
      demo: "Live demo",
      agentInstall: "Deploy with AI",
      imageAlt: "EdgeEver product preview",
      badgeText: "💡 Serverless: Migrate from Evernote, Notion & Memos via Dual-MCP",
      terminalCmd: "Deploy EdgeEver on Cloudflare: Fork https://github.com/tianma-if/edgeever & bind D1/R2",
      terminalSub: "Agent Native · Copy prompt to Cursor / Claude Code / Antigravity to deploy automatically",
      copySuccess: "Deployment Prompt copied! Paste into AI Assistant",
      agentPromptText: deploymentPrompts["en-US"],
    },
    bento: {
      eyebrow: "WHY EDGEEVER",
      heading: "Rebuilt for Self-Hosted Knowledge & AI Workflows",
      subheading: "Say goodbye to ads, device caps, and server bills. Every detail is crafted for a fast, open, and private second brain.",
      card1: {
        badge: "Classic UI",
        title: "Classic Three-Pane Layout, Faster & Lighter",
        desc: "Preserves the notebook tree, note list, and main editor. Unlimited nesting depth with zero learning curve.",
        subBadge: "100% Evernote Feel",
        treeTitle: "Notebooks",
        folder1: "01_Work_Inbox",
        folder2: "02_Ideas_Drafts",
        folder3: "03_Archive_Notes",
        folder4: "↳ 2026_Reading",
        listTitle: "Notes (18)",
        note1Title: "EdgeEver Architecture",
        note1Sub: "Serverless Cloudflare Worker & D1...",
        note2Title: "Remote MCP Setup",
        note2Sub: "Antigravity token setup guide...",
        editorTitle: "EdgeEver Architecture",
        editorBody: "EdgeEver combines the classic Evernote 3-pane layout with 100% free serverless infrastructure.",
        editorSaveTag: "Auto-saved to Cloudflare D1",
      },
      card2: {
        badge: "MCP Native",
        title: "Native AI Agent & Remote MCP Synergy",
        desc: "Built-in Remote MCP endpoint. Authorize Antigravity, Claude Code, and Codex to read, summarize, and organize your notes directly.",
        mockupStatus: "MCP Connected",
        mockupCmd: "> mcp.search_notes(\"EdgeEver\")",
        mockupResult: "Found 5 relevant notes. Created summary & tags automatically.",
      },
      card3: {
        badge: "Zero Cost",
        title: "Zero Server, Zero Maintenance, 100% Free",
        desc: "Runs on Cloudflare free tiers (up to 150k notes & 50k images). All data lives securely inside your own Cloudflare account.",
        price: "$0",
        unit: "/ mo",
        sub: "Zero Server Rental",
        metric: "150,000+",
        metricSub: "Free Note Capacity",
      },
      card4: {
        badge: "Rich Copy",
        title: "One-Click Rich Copy for Content Creators",
        desc: "Instantly converts Markdown into styled HTML with inline CSS, ready to paste into Substack, Medium, or newsletters.",
        srcTag: "Markdown Source",
        actionBtn: "One-Click Rich Copy",
        previewTitle: "# Heading 1: Rich Text & CSS",
        previewBody: "With inline CSS, instantly paste into Substack or newsletters.",
      },
      card5: {
        badge: "Data Sovereignty",
        title: "Open Data Architecture & ZIP Backup",
        desc: "Built on standard SQLite D1 & REST API, supporting full ZIP export/import with Markdown, Front Matter, attachments, and version history.",
        archiveTitle: "edgeever-backup.zip",
        archiveSub: "Markdown + Attachments + Revision History",
      },
    },
    marquee: {
      title: "Seamless Clipping, Multi-Device Sync & Ecosystem Synergy",
      subtitle: "From browser web clipping and mobile PWA capture, to Remote MCP and cross-platform workflows.",
      items: [
        {
          tag: "Web Clipper",
          title: "Chrome, Edge & Firefox",
          desc: "Chrome Web Store release and Firefox-compatible build for clipping articles, selections, and bookmarks",
          icon: "bx:bx-extension",
          color: "from-emerald-500/10 to-teal-500/5",
        },
        {
          tag: "Multi-Device",
          title: "PWA & Mobile Quick Capture",
          desc: "Instant capture on Desktop, iOS & Android with offline sync queue",
          icon: "bx:bx-mobile-alt",
          color: "from-teal-500/10 to-emerald-500/5",
        },
        {
          tag: "Uncapped",
          title: "Unlimited Active Devices",
          desc: "Self-hosted API removes commercial device cap restrictions",
          icon: "bx:bx-devices",
          color: "from-emerald-600/10 to-green-500/5",
        },
        {
          tag: "AI Ecosystem",
          title: "Remote MCP Endpoint",
          desc: "Connect Antigravity, Claude Code & Codex for smart summaries",
          icon: "bx:bxs-bot",
          color: "from-green-500/10 to-emerald-500/5",
        },
        {
          tag: "Data Synergy",
          title: "Notion & Bitable Sync",
          desc: "Transform everyday notes into structured databases via MCP",
          icon: "bx:bx-data",
          color: "from-teal-600/10 to-emerald-600/5",
        },
        {
          tag: "Content Creator",
          title: "Substack & Newsletter Rich Copy",
          desc: "Convert Markdown into styled HTML with inline CSS in 1 click",
          icon: "bx:bx-copy",
          color: "from-emerald-500/10 to-teal-500/5",
        },
        {
          tag: "Migration",
          title: "Evernote & Notion Importer",
          desc: "Automated ENEX import script and dual-MCP migration tools",
          icon: "bx:bx-transfer",
          color: "from-green-600/10 to-teal-500/5",
        },
        {
          tag: "Data Sovereignty",
          title: "Lossless ZIP Archive",
          desc: "Full SQLite D1 export and recovery with Markdown & version history",
          icon: "bx:bx-archive",
          color: "from-teal-500/10 to-emerald-500/5",
        },
      ],
    },
    features: {
      heading: "A personal notes workspace rebuilt for self-hosting",
      items: [
        {
          title: "No Server, Zero Maintenance, 100% Free",
          summary: "Say goodbye to server rental fees and complex system management. EdgeEver runs entirely within Cloudflare's free tiers.",
          points: [
            "No Server Required: No need for Docker, Nginx, or SSL configuration. Deploy directly to Cloudflare with one simple tool.",
            "100% Free Forever: Take full advantage of free tiers for Cloudflare Workers, D1, and R2 (supports up to 150k notes and 50k images).",
            "Full Data Ownership: Serverless doesn't mean third-party storage. All your notes live securely within your own Cloudflare account.",
          ],
        },
        {
          title: "AI Agent native",
          summary: "Built-in REST API, OpenAPI schema, and Remote MCP endpoint let AI assistants read, create, and organize notes safely.",
          points: [
            "Generate an MCP token in the app to connect EdgeEver with Codex, Claude Code, Antigravity, and similar tools.",
            "Useful for idea summaries, automatic tagging, knowledge graph cleanup, and cross-note retrieval.",
            "It can also connect to tools such as Notion databases and Feishu Bitable, turning scattered information from everyday notes into structured data.",
            "Agent workflows operate on your private instance instead of a closed notes platform.",
          ],
        },
        {
          title: "Classic three-pane workflow",
          summary: "Notebook tree, note list, and editor stay familiar for Evernote-style migrations.",
          points: [
            "Unlimited nested notebooks support long-lived personal knowledge bases.",
            "Drag notebooks to reorder or change hierarchy, and move or merge notes in batches.",
            "A TipTap-based rich text editor includes note version history for reviewing earlier content.",
          ],
        },
        {
          title: "Open data, easier migration",
          summary: "Notes remain available as structured JSON, Markdown, and plain text, with native EdgeEver ZIP import and export for editing, APIs, search, agents, and complete recovery.",
          points: [
            "Content lives in Cloudflare D1, based on standard SQLite, and can be read via API, MCP, or CLI.",
            "Native EdgeEver ZIP import and export includes Markdown, Front Matter, nested notebooks, attachments, and revision history for complete recovery between instances.",
            "Evernote import support lowers the cost of moving from an existing notes library.",
            "Markdown keeps import, export, and agent workflows portable.",
          ],
        },
        {
          title: "Multi-device sync, uncapped limits",
          summary: "Use EdgeEver from desktop, phone, or tablet with no device limits and a PWA-friendly experience.",
          points: [
            "No device limits: self-hosted API means no commercial restrictions on the number of active login devices.",
            "Open it in the browser or install it as a PWA for quick capture.",
            "Existing notes support offline drafts and a local sync queue for weak network conditions.",
          ],
        },
        {
          title: "One instance, isolated accounts",
          summary: "Create accounts for family or a small team while giving each person a separate private notes workspace.",
          points: [
            "The owner can create or disable member accounts and reset passwords; public registration stays closed.",
            "Each member has isolated notebooks, notes, attachments, Trash, and import/export data.",
            "MCP tokens are isolated by workspace, so AI Agents only access explicitly authorized data.",
          ],
        },
      ],
    },
    guides: {
      eyebrow: "EdgeEver Guides",
      heading: "Deploy, migrate, and put AI agents to work",
      description: "The fastest paths into EdgeEver: deploy your own instance, move an existing Evernote archive, then connect MCP-powered AI workflows.",
      items: [
        {
          title: "Two ways to deploy EdgeEver",
          summary: "Let an AI Agent complete the online deployment, or configure the same flow online from a GitHub Fork.",
          href: "/blog/ai-agent-deploy-cloudflare",
          cta: "Read deployment guide",
        },
        {
          title: "Migrate from Evernote",
          summary: "Use EdgeEver MCP, evernote-backup, and the ENEX import script to migrate an old notes library into your self-hosted instance.",
          href: "/blog/evernote-migration-guide",
          cta: "Read migration guide",
        },
        {
          title: "AI Agent advanced play",
          summary: "Turn real notes into knowledge maps, tag cleanup plans, and higher-level personal knowledge workflows through MCP.",
          href: "/guides/advanced-play",
          cta: "Explore workflows",
        },
      ],
    },
  },
} as const;
