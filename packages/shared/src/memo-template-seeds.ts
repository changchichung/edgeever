export type MemoTemplateSeedLocale = "zh-CN" | "en-US";

export type MemoTemplateSeedTranslation = {
  title: string;
  description: string;
  contentMarkdown: string;
};

export type MemoTemplateSeed = {
  key: "quick-note" | "meeting" | "weekly-review" | "reading" | "okr";
  translationKey: "quickNote" | "meeting" | "weeklyReview" | "reading" | "okr";
  tag: string;
  translations: Record<MemoTemplateSeedLocale, MemoTemplateSeedTranslation>;
};

const seed = (
  metadata: Omit<MemoTemplateSeed, "translations">,
  zhCN: MemoTemplateSeedTranslation,
  enUS: MemoTemplateSeedTranslation,
): MemoTemplateSeed => ({
  ...metadata,
  translations: { "zh-CN": zhCN, "en-US": enUS },
});

export const DEFAULT_MEMO_TEMPLATE_SEEDS: readonly MemoTemplateSeed[] = [
  seed(
    { key: "quick-note", translationKey: "quickNote", tag: "quick-note" },
    {
      title: "靈感速記",
      description: "快速捕捉閃念、臨時靈感、資料鏈接與即刻行動。",
      contentMarkdown: "## 💡 閃念記錄\n\n- \n\n## 📌 背景與補充說明\n\n\n\n## 🚀 下一步動作\n\n- [ ] ",
    },
    {
      title: "Quick Spark",
      description: "Capture fleeting thoughts, ideas, links, and immediate action items.",
      contentMarkdown: "## 💡 Fleeting Thoughts\n\n- \n\n## 📌 Context & Notes\n\n\n\n## 🚀 Next Actions\n\n- [ ] ",
    },
  ),
  seed(
    { key: "meeting", translationKey: "meeting", tag: "meeting" },
    {
      title: "會議紀要",
      description: "結構化記錄議題背景、核心結論與帶負責人的待辦事項。",
      contentMarkdown: "# 📝 會議紀要\n\n- **時間**：\n- **主持人/記錄人**：\n- **參會人**：\n\n---\n\n## 🎯 會議目標\n\n- \n\n## 💬 核心討論與決策\n\n1. **[議題 1]**\n   - 討論要點：\n   - ✅ **決議**：\n\n2. **[議題 2]**\n   - 討論要點：\n   - ✅ **決議**：\n\n## 📋 待辦事項 (Action Items)\n\n- [ ] **[負責人]** 任務描述 (截止日期：MM-DD)\n- [ ] **[負責人]** 任務描述 (截止日期：MM-DD)\n",
    },
    {
      title: "Meeting Minutes",
      description: "Structured log for agenda, key decisions, and action items with owners.",
      contentMarkdown: "# 📝 Meeting Minutes\n\n- **Time**:\n- **Host/Recorder**:\n- **Attendees**:\n\n---\n\n## 🎯 Goal\n\n- \n\n## 💬 Discussion & Decisions\n\n1. **[Topic 1]**\n   - Points:\n   - ✅ **Decision**:\n\n2. **[Topic 2]**\n   - Points:\n   - ✅ **Decision**:\n\n## 📋 Action Items\n\n- [ ] **[Owner]** Task description (Due: MM-DD)\n- [ ] **[Owner]** Task description (Due: MM-DD)\n",
    },
  ),
  seed(
    { key: "weekly-review", translationKey: "weeklyReview", tag: "weekly-review" },
    {
      title: "週報與進展復盤",
      description: "梳理本週核心產出、風險卡點與下週關鍵優先級。",
      contentMarkdown: "# 🗓️ 工作週報\n\n## 🌟 本週核心進展 (Highlights)\n\n- [x] **[項目/功能]** 完成情況與成果說明\n- [x] **[項目/功能]** 完成情況與成果說明\n\n## 🚧 卡點與風險 (Blockers & Risks)\n\n- ⚠️ **阻塞項**：原因及所需支持\n\n## 🎯 下週優先級 (Next Week Priorities)\n\n- [ ] \n- [ ] \n- [ ] \n\n## 💡 總結與思考\n\n- \n",
    },
    {
      title: "Weekly Review & Status",
      description: "Summarize weekly highlights, blockers, and next week's key priorities.",
      contentMarkdown: "# 🗓️ Weekly Status Report\n\n## 🌟 Highlights\n\n- [x] **[Project/Feature]** Accomplishment details\n- [x] **[Project/Feature]** Accomplishment details\n\n## 🚧 Blockers & Risks\n\n- ⚠️ **Blocker**: Reason and required support\n\n## 🎯 Next Week Priorities\n\n- [ ] \n- [ ] \n- [ ] \n\n## 💡 Reflection & Insights\n\n- \n",
    },
  ),
  seed(
    { key: "reading", translationKey: "reading", tag: "reading" },
    {
      title: "深度閱讀卡片",
      description: "提煉核心觀點、精妙摘錄、個人理解與關聯知識卡片。",
      contentMarkdown: "# 📖 深度閱讀卡片\n\n- **書名/文章**：\n- **作者/來源**：\n- **推薦指數**：⭐⭐⭐⭐⭐\n\n---\n\n## 💡 一句話總結 (Key Takeaway)\n\n> \n\n## ✍️ 核心觀點與金句摘錄\n\n> [摘錄內容]\n> —— *原書/原文*\n\n## 🧠 我的理解與延伸思考\n\n- \n\n## 🔗 關聯知識與行動\n\n- [ ] **落地實踐**：\n",
    },
    {
      title: "Reading Note Card",
      description: "Extract key takeaways, quotes, reflections, and connected concepts.",
      contentMarkdown: "# 📖 Reading Note Card\n\n- **Book/Article**:\n- **Author/Source**:\n- **Rating**: ⭐⭐⭐⭐⭐\n\n---\n\n## 💡 Key Takeaway\n\n> \n\n## ✍️ Highlights & Quotes\n\n> [Quote content]\n> —— *Original Source*\n\n## 🧠 Personal Reflections\n\n- \n\n## 🔗 Action & Practice\n\n- [ ] **Action Plan**:\n",
    },
  ),
  seed(
    { key: "okr", translationKey: "okr", tag: "okr" },
    {
      title: "目標與任務拆解",
      description: "明確 OKR 目標、關鍵結果、里程碑與具體執行清單。",
      contentMarkdown: "# 🎯 目標拆解\n\n- **週期**：\n- **負責人**：\n\n---\n\n## 📌 目標 (Objective)\n\n> \n\n## 📈 關鍵結果 (Key Results)\n\n- **KR 1**：期望指標 -> 當前進度\n- **KR 2**：期望指標 -> 當前進度\n\n## 🗓️ 里程碑節點 (Milestones)\n\n- [ ] **階段一 (日期)**：完成標的\n- [ ] **階段二 (日期)**：完成標的\n\n## 📋 執行任務清單\n\n- [ ] \n- [ ] \n",
    },
    {
      title: "Goal & Task Breakdown",
      description: "Define OKRs, Key Results, milestones, and task checklists.",
      contentMarkdown: "# 🎯 Goal Breakdown\n\n- **Period**:\n- **Owner**:\n\n---\n\n## 📌 Objective\n\n> \n\n## 📈 Key Results\n\n- **KR 1**: Target metric -> Current progress\n- **KR 2**: Target metric -> Current progress\n\n## 🗓️ Milestones\n\n- [ ] **Phase 1 (Date)**: Target\n- [ ] **Phase 2 (Date)**: Target\n\n## 📋 Execution Checklist\n\n- [ ] \n- [ ] \n",
    },
  ),
];

export const normalizeMemoTemplateSeedLocale = (
  locale: string | null | undefined,
): MemoTemplateSeedLocale => locale?.toLowerCase().startsWith("en") ? "en-US" : "zh-CN";

export const localizeMemoTemplateSeed = (
  templateSeed: MemoTemplateSeed,
  locale: string | null | undefined,
): MemoTemplateSeedTranslation => templateSeed.translations[normalizeMemoTemplateSeedLocale(locale)];

export const defaultMemoTemplateId = (workspaceId: string, seedKey: string) =>
  `${workspaceId}_template_${seedKey}`;

export const memoTemplateSeedTranslations = (locale: MemoTemplateSeedLocale) =>
  Object.fromEntries(DEFAULT_MEMO_TEMPLATE_SEEDS.map((item) => [
    item.translationKey,
    item.translations[locale],
  ])) as Record<MemoTemplateSeed["translationKey"], MemoTemplateSeedTranslation>;
