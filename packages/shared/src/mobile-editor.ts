import type { ImageWidthPresetId } from "./image-display";

export type MobileEditorLocale = "zh-CN" | "en-US";

export type MobileEditorToolbarActionId =
  | "image"
  | "bold"
  | "bulletList"
  | "taskList"
  | "increaseListIndent"
  | "decreaseListIndent"
  | "blockquote"
  | "horizontalRule";

export const MOBILE_EDITOR_ACTIVE_FLAGS = {
  bold: 1,
  taskList: 2,
  bulletList: 8,
  blockquote: 16,
} as const;

export const MOBILE_EDITOR_TOOLBAR_ACTIONS = [
  { id: "image", activeFlag: 0 },
  { id: "bold", activeFlag: MOBILE_EDITOR_ACTIVE_FLAGS.bold },
  { id: "bulletList", activeFlag: MOBILE_EDITOR_ACTIVE_FLAGS.bulletList },
  { id: "taskList", activeFlag: MOBILE_EDITOR_ACTIVE_FLAGS.taskList },
  { id: "increaseListIndent", activeFlag: 0 },
  { id: "decreaseListIndent", activeFlag: 0 },
  { id: "blockquote", activeFlag: MOBILE_EDITOR_ACTIVE_FLAGS.blockquote },
  { id: "horizontalRule", activeFlag: 0 },
] as const satisfies ReadonlyArray<{
  id: MobileEditorToolbarActionId;
  activeFlag: number;
}>;

const MOBILE_EDITOR_COPY = {
  "zh-CN": {
    placeholder: "開始記錄...",
    toolbar: "編輯器工具欄",
    actions: {
      image: "上傳圖片",
      bold: "加粗",
      bulletList: "無序列表",
      taskList: "任務清單",
      increaseListIndent: "增加列表層級（Tab）",
      decreaseListIndent: "減少列表層級（Shift + Tab）",
      blockquote: "引用",
      horizontalRule: "分割線",
    },
    imageScale: "圖片顯示尺寸",
    imageSizes: {
      small: "較小",
      medium: "適中",
      large: "較大",
      full: "鋪滿",
    },
  },
  "en-US": {
    placeholder: "Start writing...",
    toolbar: "Editor toolbar",
    actions: {
      image: "Upload image",
      bold: "Bold",
      bulletList: "Bullet list",
      taskList: "Task list",
      increaseListIndent: "Increase list level (Tab)",
      decreaseListIndent: "Decrease list level (Shift + Tab)",
      blockquote: "Quote",
      horizontalRule: "Horizontal rule",
    },
    imageScale: "Image display size",
    imageSizes: {
      small: "Small",
      medium: "Medium",
      large: "Large",
      full: "Full",
    },
  },
} as const;

export const getMobileEditorPlaceholder = (locale: MobileEditorLocale): string =>
  MOBILE_EDITOR_COPY[locale].placeholder;

export const getMobileEditorToolbarLabel = (locale: MobileEditorLocale): string =>
  MOBILE_EDITOR_COPY[locale].toolbar;

export const getMobileEditorToolbarActionLabel = (
  action: MobileEditorToolbarActionId,
  locale: MobileEditorLocale
): string => MOBILE_EDITOR_COPY[locale].actions[action];

export const getMobileEditorImageScaleLabel = (locale: MobileEditorLocale): string =>
  MOBILE_EDITOR_COPY[locale].imageScale;

export const getMobileEditorImageWidthPresetLabel = (
  preset: ImageWidthPresetId,
  locale: MobileEditorLocale
): string => MOBILE_EDITOR_COPY[locale].imageSizes[preset];

export const getMobileEditorInputAttributes = (className: string): Record<string, string> => ({
  autocapitalize: "sentences",
  autocomplete: "on",
  autocorrect: "on",
  class: className,
  inputmode: "text",
  spellcheck: "true",
});
