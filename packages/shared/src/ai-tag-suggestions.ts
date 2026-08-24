export const MAX_AI_TAG_SUGGESTIONS = 3;

export const DEFAULT_AI_TAG_SUGGESTION_PROMPT_EN = [
  "Suggest concise tags that classify the supplied note.",
  "Derive every tag solely from a concrete topic explicitly supported by the title or note content.",
  "Relevance is mandatory: never invent a topic, and prefer no tag over a weak or generic match.",
  "Return zero to three tags; one or two strong tags are usually better than three.",
  "Prefer a suitable existing tag over creating a new tag.",
  "Avoid duplicates, near-duplicates, overly broad labels, sentences, and leading hash signs.",
  "Use the note's language.",
].join(" ");

export const DEFAULT_AI_TAG_SUGGESTION_PROMPT_ZH_CN = [
  "爲給定筆記建議簡潔的分類標籤。",
  "每個標籤必須僅來自標題或正文明確支持的具體主題。",
  "相關性是硬性要求：不得臆造主題；寧可不返回標籤，也不要給出牽強或寬泛的匹配。",
  "返回零到三個標籤；通常一兩個高質量標籤比湊滿三個更好。",
  "有合適的已有標籤時，優先複用，不要新建標籤。",
  "避免重複、近義重複、過於寬泛的標籤、完整句子和開頭的井號。",
  "使用筆記本身的語言。",
].join("");

export const getDefaultAiTagSuggestionPrompt = (locale?: string) =>
  locale?.toLocaleLowerCase().startsWith("zh")
    ? DEFAULT_AI_TAG_SUGGESTION_PROMPT_ZH_CN
    : DEFAULT_AI_TAG_SUGGESTION_PROMPT_EN;

export const DEFAULT_AI_TAG_SUGGESTION_PROMPT = DEFAULT_AI_TAG_SUGGESTION_PROMPT_EN;
