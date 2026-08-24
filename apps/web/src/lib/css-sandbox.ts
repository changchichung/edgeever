/**
 * 安全的 CSS 過濾器與作用域限制器
 */

const ALLOWED_CSS_PROPERTIES = new Set([
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "line-height",
  "letter-spacing",
  "color",
  "background",
  "background-color",
  "border",
  "border-top",
  "border-right",
  "border-bottom",
  "border-left",
  "border-color",
  "border-width",
  "border-style",
  "border-radius",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "text-align",
  "text-decoration",
  "text-transform",
  "text-indent",
  "word-break",
  "word-wrap",
  "white-space",
  "list-style",
  "list-style-type",
]);

/**
 * 過濾單行 CSS 規則，僅保留安全的排版屬性，阻斷 url() 和定位等危險內容
 */
const sanitizeRulesBlock = (block: string): string => {
  return block
    .split(";")
    .map((rule) => {
      const parts = rule.split(":");
      if (parts.length < 2) return "";
      const property = parts[0].trim().toLowerCase();
      const value = parts.slice(1).join(":").trim();

      // 僅允許白名單屬性
      if (!ALLOWED_CSS_PROPERTIES.has(property)) {
        return "";
      }

      // 深度攔截潛在危險值 (如 url, expression, javascript)
      if (
        /url\s*\(/i.test(value) ||
        /expression/i.test(value) ||
        /javascript\s*:/i.test(value) ||
        /behavior/i.test(value) ||
        /-moz-binding/i.test(value)
      ) {
        return "";
      }

      return `${property}: ${value};`;
    })
    .filter(Boolean)
    .join(" ");
};

/**
 * 對用戶的 CSS 進行安全過濾，並將其作用域限定在當前編輯器的 ProseMirror 區域
 */
export const sanitizeAndScopeCss = (css: string): string => {
  if (!css) return "";

  // 1. 過濾全局危險指令
  let cleaned = css
    .replace(/@import/gi, "")
    .replace(/@charset/gi, "")
    .replace(/@namespace/gi, "");

  // 2. 匹配選擇器與大括號塊
  const scopePrefix = ".edgeever-editor .ProseMirror ";

  // 匹配形如 selector { rules } 的結構
  cleaned = cleaned.replace(/([^{]+)({[^}]+})/g, (_, selectors, blockContent) => {
    // 提取大括號內部的規則塊並過濾
    const rawRules = blockContent.slice(1, -1);
    const safeRules = sanitizeRulesBlock(rawRules);
    if (!safeRules) return "";

    // 給選擇器加前綴，限制其影響範圍
    const scopedSelectors = selectors
      .split(",")
      .map((s: string) => {
        const trimmed = s.trim();
        if (!trimmed) return "";
        // 若選擇器已經有了前綴或特定類，不要重複加
        if (trimmed.startsWith(".ProseMirror") || trimmed.includes(".edgeever-editor")) {
          return trimmed;
        }
        return `${scopePrefix}${trimmed}`;
      })
      .filter(Boolean)
      .join(", ");

    return scopedSelectors ? `${scopedSelectors} { ${safeRules} }` : "";
  });

  return cleaned;
};

/**
 * 動態解析用戶的自定義 CSS，並提取出能直接應用於微信/富文本一鍵複製時的標籤樣式字典
 */
export const parseCustomCssToStyles = (css: string): Record<string, string> => {
  const stylesMap: Record<string, string> = {};
  if (!css) return stylesMap;

  // 使用簡單的正則匹配選擇器和規則內容
  const regex = /([^{]+){([^}]+)}/g;
  let match;

  while ((match = regex.exec(css)) !== null) {
    const selectors = match[1].split(",");
    const rawRules = match[2];
    const safeRules = sanitizeRulesBlock(rawRules);

    if (!safeRules) continue;

    selectors.forEach((sel) => {
      const key = sel.trim().toLowerCase();
      // 只提取針對純標籤的簡單選擇器（如 h1, p, blockquote 等），這樣便於直接在微信複製裏進行標籤內聯樣式動態覆蓋
      if (/^[a-z0-9]+$/i.test(key)) {
        if (stylesMap[key]) {
          stylesMap[key] = `${stylesMap[key]} ${safeRules}`;
        } else {
          stylesMap[key] = safeRules;
        }
      }
    });
  }

  return stylesMap;
};
