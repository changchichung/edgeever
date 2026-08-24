import type {
  AiAction,
  AiPromptParameterKind,
  AiPromptResultMode,
} from "./ai-assistant";

export type AiPromptSeedKey = Exclude<AiAction, "custom">;
export type AiPromptSeedLocale = "zh-CN" | "en-US";

export type AiPromptSeedTranslation = {
  name: string;
  description: string;
  instruction: string;
};

/** Factory prompt metadata. The top-level text is the Simplified Chinese fallback for legacy callers. */
export type AiPromptSeed = AiPromptSeedTranslation & {
  key: AiPromptSeedKey;
  action: AiPromptSeedKey;
  parameterKind: AiPromptParameterKind;
  resultMode: AiPromptResultMode;
  translations: Record<AiPromptSeedLocale, AiPromptSeedTranslation>;
};

const seed = (
  metadata: Omit<AiPromptSeed, keyof AiPromptSeedTranslation | "translations">,
  zhCN: AiPromptSeedTranslation,
  enUS: AiPromptSeedTranslation,
): AiPromptSeed => ({
  ...metadata,
  ...zhCN,
  translations: { "zh-CN": zhCN, "en-US": enUS },
});

export const normalizeAiPromptSeedLocale = (locale: string | null | undefined): AiPromptSeedLocale =>
  locale?.toLowerCase().startsWith("en") ? "en-US" : "zh-CN";

export const localizeAiPromptSeed = (
  promptSeed: AiPromptSeed,
  locale: string | null | undefined,
): AiPromptSeedTranslation => promptSeed.translations[normalizeAiPromptSeedLocale(locale)];

/** Deterministic id for a seeded default prompt in a workspace. */
export const defaultAiPromptId = (workspaceId: string, seedKey: string) =>
  `${workspaceId}_aiprompt_${seedKey}`;

/** Parse legacy deterministic ids. New code should use the persisted seedKey field instead. */
export const parseDefaultAiPromptKey = (promptId: string): AiPromptSeedKey | null => {
  const match = /_aiprompt_([a-z0-9-]+)$/i.exec(promptId);
  if (!match) return null;
  const key = match[1] as AiPromptSeedKey;
  return DEFAULT_AI_PROMPT_SEEDS.some((item) => item.key === key) ? key : null;
};

/**
 * Single application catalog for default prompt behavior and localized copy.
 * Persisted rows only contain user overrides; untouched defaults are materialized from this catalog.
 */
export const DEFAULT_AI_PROMPT_SEEDS: readonly AiPromptSeed[] = [
  seed(
    { key: "summarize", action: "summarize", parameterKind: "none", resultMode: "append" },
    {
      name: "總結",
      description: "壓縮全文，提煉主題、結論與可執行結果",
      instruction: [
        "對筆記做真正的精簡總結，不要逐句改寫、同義複述或回聲式重寫。",
        "識別中心主題、主要主張、關鍵結論與可執行結果。",
        "省略重複、修辭、舉例、引語和次要細節，除非它們對理解關鍵結論必不可少。",
        "較長筆記目標約爲原文 20–30% 篇幅，用 3–7 條簡潔 Markdown 要點；短筆記用 1–3 句即可。",
        "不要大段照搬原文，也不要添加原文沒有的信息。",
        "保持筆記原語言，只返回 Markdown 總結。",
      ].join(""),
    },
    {
      name: "Summarize",
      description: "Condense the note into its topic, conclusions, and actionable outcomes",
      instruction: [
        "Create a genuinely condensed summary of the note rather than rewriting, paraphrasing line by line, or echoing it. ",
        "Identify the central topic, main claims, essential conclusions, and actionable outcomes. ",
        "Omit repetition, rhetorical phrasing, examples, quotations, and minor details unless necessary to understand a key conclusion. ",
        "For a substantial note, target roughly 20–30% of the source length and use 3–7 concise Markdown bullet points; for a short note, use 1–3 concise sentences. ",
        "Do not reproduce long passages verbatim or add facts that are not present in the source. ",
        "Preserve the note's language and return only the summary in Markdown.",
      ].join(""),
    },
  ),
  seed(
    { key: "translate", action: "translate", parameterKind: "target-language", resultMode: "both" },
    {
      name: "翻譯",
      description: "翻譯爲指定目標語言，保留結構與格式",
      instruction: "將完整筆記翻譯成用戶指定的目標語言。保留原意、Markdown 結構、鏈接與代碼塊。只返回譯文，不要評論。",
    },
    {
      name: "Translate",
      description: "Translate into a selected language while preserving formatting",
      instruction: "Translate the complete note into the target language specified by the user. Preserve its meaning, Markdown structure, links, and code blocks. Return only the translated note without commentary.",
    },
  ),
  seed(
    { key: "improve-writing", action: "improve-writing", parameterKind: "none", resultMode: "both" },
    {
      name: "潤色",
      description: "校正語言並提升文字的清晰度與流暢度",
      instruction: "潤色內容，修正錯別字、語法與標點，改善用詞、句式、清晰度和流暢度，但不要改變原意或刻意縮短內容。保持原語言與有用的 Markdown 格式。只返回潤色後的內容。",
    },
    {
      name: "Polish",
      description: "Correct the language and improve clarity and flow",
      instruction: "Polish the content by correcting spelling, grammar, and punctuation and improving word choice, sentence structure, clarity, and flow. Do not change its meaning or deliberately shorten it. Preserve its language and useful Markdown formatting. Return only the polished content.",
    },
  ),
  seed(
    { key: "make-shorter", action: "make-shorter", parameterKind: "none", resultMode: "both" },
    {
      name: "精煉表達",
      description: "刪去重複與冗餘，讓表達更簡潔有力",
      instruction: "精煉內容，刪除重複、空話和不必要的修飾，合併可以合併的句子，使表達簡潔、清晰、有力。保留所有關鍵事實、觀點與原意，不要添加新信息。保持原語言與有用的 Markdown 格式。只返回精煉後的內容。",
    },
    {
      name: "Make concise",
      description: "Remove repetition and make the writing concise and direct",
      instruction: "Refine the content by removing repetition, filler, and unnecessary modifiers and by combining sentences where useful. Make it concise, clear, and direct while preserving every key fact, claim, and the original meaning. Do not add new information. Preserve its language and useful Markdown formatting. Return only the refined content.",
    },
  ),
  seed(
    { key: "rewrite-proofread", action: "rewrite-proofread", parameterKind: "none", resultMode: "both" },
    {
      name: "轉爲小紅書風格",
      description: "改寫成自然、有吸引力的小紅書筆記",
      instruction: "將內容改寫成適合小紅書發佈的筆記：生成吸引人的標題，使用自然、有親和力的口吻、短段落和清晰層次，可適量加入貼合語義的 Emoji，並在結尾給出 3–8 個相關話題標籤。保留原文的關鍵事實與觀點，不誇大效果，不編造經歷、數據或結論。只返回可直接發佈的內容。",
    },
    {
      name: "Convert to Xiaohongshu style",
      description: "Rewrite as a natural and engaging Xiaohongshu post",
      instruction: "Rewrite the content as a Xiaohongshu-ready post. Add an engaging title, use a natural and approachable voice, short paragraphs, and clear structure, include a few contextually appropriate emoji, and end with 3–8 relevant hashtags. Preserve the source's key facts and claims without exaggerating results or inventing experiences, data, or conclusions. Return only the publishable post.",
    },
  ),
  seed(
    { key: "simplify-language", action: "simplify-language", parameterKind: "none", resultMode: "both" },
    {
      name: "轉爲推特風格",
      description: "改寫成簡潔、有觀點的推文或推文串",
      instruction: "將內容改寫成適合推特發佈的文本：開頭直接抓住重點，表達簡潔、有觀點、易讀。內容較短時輸出一條推文；無法在一條內保留關鍵信息時，輸出帶序號的精簡推文串。只在確有幫助時使用少量標籤。保留原文事實與立場，不製造噱頭或編造信息。只返回可直接發佈的內容。",
    },
    {
      name: "Convert to X (Twitter) style",
      description: "Rewrite as a concise, opinionated post or thread",
      instruction: "Rewrite the content for X (Twitter): lead with the main point and make it concise, opinionated, and easy to scan. Return one post when the key information fits; otherwise return a compact numbered thread. Use hashtags sparingly and only when useful. Preserve the source's facts and position without manufacturing hype or information. Return only the publishable post or thread.",
    },
  ),
];

export const getDefaultAiPromptSeed = (key: string) =>
  DEFAULT_AI_PROMPT_SEEDS.find((item) => item.key === key) ?? null;
