import { describe, expect, test } from "bun:test";
import {
  buildMarkdownFilename,
  createMarkdownFile,
} from "../apps/web/src/lib/note-markdown-export";

describe("single-note Markdown export", () => {
  test("creates a UTF-8 Markdown file with the current content", async () => {
    const file = createMarkdownFile("# 標題\n\n當前未保存內容", "項目 / 計劃", "Untitled note");

    expect(file.filename).toBe("項目 - 計劃.md");
    expect(file.blob.type).toBe("text/markdown;charset=utf-8");
    expect(await file.blob.text()).toBe("# 標題\n\n當前未保存內容");
  });

  test("sanitizes unsafe and reserved filenames", () => {
    expect(buildMarkdownFilename("CON", "Untitled note")).toBe("_CON.md");
    expect(buildMarkdownFilename('<>:"/\\|?*', "Untitled note")).toBe("---------.md");
    expect(buildMarkdownFilename("...", "Untitled note")).toBe("Untitled note.md");
    expect(buildMarkdownFilename("README.md", "Untitled note")).toBe("README.md");
  });
});
