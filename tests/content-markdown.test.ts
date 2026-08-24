import { describe, expect, test } from "bun:test";
import { docToMarkdown, markdownToDoc } from "@edgeever/shared";

describe("shared Markdown conversion", () => {
  test("parses adjacent headings, lists, quotes, and inline formatting into TipTap nodes", () => {
    const doc = markdownToDoc(`## 1. 公司主體信息 (Organization Info)
* **公司中文全稱**：鄭州市冰硅網絡科技有限公司
* **公司英文名稱**：Example Co., Ltd.
## 2. 聯繫方式 (Domain & Contact)
* **項目官方網站**：[EdgeEver](https://www.edgeever.org)
> [!WARNING]
> 請勿綁定其他賬號。`);

    expect(doc.content.map((node) => node.type)).toEqual([
      "heading",
      "bulletList",
      "heading",
      "bulletList",
      "blockquote",
    ]);

    const firstList = doc.content[1];
    const firstText = firstList.content?.[0]?.content?.[0]?.content?.[0];
    expect(firstText).toEqual({
      type: "text",
      text: "公司中文全稱",
      marks: [{ type: "bold" }],
    });

    const secondList = doc.content[3];
    const linkText = secondList.content?.[0]?.content?.[0]?.content?.[2];
    expect(linkText).toMatchObject({
      type: "text",
      text: "EdgeEver",
      marks: [{ type: "link", attrs: { href: "https://www.edgeever.org" } }],
    });
  });

  test("serializes TipTap marks and block nodes back to Markdown", () => {
    const markdown = `# 標題

- **粗體**與*斜體*
- [鏈接](https://example.com)

> 引用

\`code\` 和 ~~刪除~~`;

    expect(docToMarkdown(markdownToDoc(markdown))).toBe(markdown);
  });

  test("preserves fenced code blocks and standalone images", () => {
    const markdown = `\`\`\`ts
const answer = 42;
\`\`\`

![示例](/api/v1/resources/res_1/blob "標題")`;

    const doc = markdownToDoc(markdown);
    expect(doc.content.map((node) => node.type)).toEqual(["codeBlock", "image"]);
    expect(docToMarkdown(doc)).toBe(markdown);
  });

  test("parses and serializes inline and block LaTeX", () => {
    const markdown = `Euler: $e^{i\\pi}+1=0$.

$$
\\frac{a}{b}
$$`;

    const doc = markdownToDoc(markdown);
    expect(doc.content[0]?.content?.[1]).toMatchObject({
      type: "inlineMath",
      attrs: { latex: "e^{i\\pi}+1=0" },
    });
    expect(doc.content[1]).toMatchObject({
      type: "blockMath",
      attrs: { latex: "\\frac{a}{b}" },
    });
    expect(docToMarkdown(doc)).toBe(markdown);
  });
});
