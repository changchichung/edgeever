import { enUS, zhCN } from "@edgeever/shared/i18n";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  readMobileLocalePreference,
  writeMobileLocalePreference,
  type MobileLocalePreference,
} from "./preferences";

type SupportedMobileLocale = "zh-CN" | "en-US";
type MobileLocaleContextValue = {
  preference: MobileLocalePreference;
  resolvedLocale: SupportedMobileLocale;
  setPreference: (preference: MobileLocalePreference) => void;
  translate: (value: string) => string;
};

type TranslationPair = { source: string; target: string; pattern?: RegExp; placeholders?: string[] };

const mobileOnlyTranslations = new Map<string, string>([
  ["返回", "Back"],
  ["關閉對話框", "Close dialog"],
  ["切換到深色模式", "Switch to dark mode"],
  ["切換到淺色模式", "Switch to light mode"],
  ["完成編輯", "Finish editing"],
  ["完成新建筆記", "Finish creating note"],
  ["Markdown 源代碼編輯", "Edit Markdown source"],
  ["資源", "Resources"],
  ["筆記列表操作", "Note list actions"],
  ["搜索", "Search"],
  ["搜索標題、正文或標籤", "Search titles, content, or tags"],
  ["輸入關鍵詞開始搜索", "Enter a keyword to search"],
  ["搜索本機同步緩存，結果會即時顯示", "Search the local synced cache with instant results"],
  ["筆記操作", "Note actions"],
  ["AI 筆記助手", "AI note assistant"],
  ["版本歷史", "Version history"],
  ["分享筆記", "Share note"],
  ["複製筆記 ID", "Copy note ID"],
  ["同步後可複製筆記 ID", "Copy note ID after sync"],
  ["筆記 ID 已複製", "Note ID copied"],
  ["複製筆記 ID 失敗", "Could not copy note ID"],
  ["分享失敗", "Could not share"],
  ["無法創建分享鏈接，請檢查網絡後重試。", "Could not create a share link. Check your connection and try again."],
  ["同步衝突", "Sync conflict"],
  ["同步失敗", "Sync failed"],
  ["待同步", "Pending sync"],
  ["已同步", "Synced"],
  ["立即同步", "Sync now"],
  ["查看同步狀態並立即重試", "View sync status and retry now"],
  ["本地改動還在等待上傳到雲端。可立即重試同步。", "Local changes are waiting to upload. You can retry sync now."],
  ["本地改動未能上傳到雲端。可立即重試同步。", "Local changes could not upload. You can retry sync now."],
  ["本地改動未能上傳到雲端。內容仍保存在本機，可立即重試。", "Local changes could not upload. They remain on this device and you can retry now."],
  ["本地改動待上傳。下拉刷新或點此可立即同步。", "Local changes are pending upload. Pull to refresh or tap to sync now."],
  ["查看並處理同步衝突", "Review and resolve the sync conflict"],
  ["雲端筆記已在其他標籤頁、設備，或離線期間被更新，本地草稿無法直接覆蓋。可先複製本地草稿，再採用雲端版本後繼續編輯。", "The cloud note was updated in another tab, on another device, or while you were offline. Copy your local draft, then use the cloud version before editing again."],
  ["雲端筆記已在其他標籤頁、設備，或離線期間被更新。可先複製本地草稿，再採用雲端版本後繼續編輯。", "The cloud note was updated in another tab, on another device, or while you were offline. Copy your local draft, then use the cloud version before editing again."],
  ["查看歷史", "View history"],
  ["使用雲端版本", "Use cloud version"],
  ["採用雲端並重新加載", "Use cloud and reload"],
  ["採用雲端版本失敗", "Could not use the cloud version"],
  ["複製本地草稿", "Copy local draft"],
  ["本地草稿已複製到剪貼板。", "Local draft copied to the clipboard."],
  ["沒有可複製的本地草稿。", "There is no local draft to copy."],
  ["已複製", "Copied"],
  ["更多", "More"],
  ["加載失敗", "Failed to load"],
  ["請稍後重試", "Please try again later"],
  ["重試", "Retry"],
  ["圖片上傳失敗", "Image upload failed"],
  ["請檢查網絡連接後重試", "Check your connection and try again"],
  ["添加圖片或附件", "Add image or attachment"],
  ["選擇拍照、相冊或設備文件", "Take a photo or choose from your library or device"],
  ["關閉圖片來源選擇", "Close image source picker"],
  ["拍照", "Take photo"],
  ["從相冊選擇", "Choose from library"],
  ["選擇文件", "Choose file"],
  ["需要相機權限", "Camera access required"],
  ["允許 EdgeEver 使用相機後，才能直接拍照插入筆記。", "Allow EdgeEver to use the camera to take photos and insert them into notes."],
  ["相機權限已被關閉。請前往系統設置允許 EdgeEver 使用相機。", "Camera access is disabled. Open system settings and allow EdgeEver to use the camera."],
  ["前往設置", "Open settings"],
  ["系統未能恢復上次選擇的圖片，請重試", "The system could not restore the previously selected image. Please try again."],
  ["退出新建筆記？", "Exit the new note?"],
  ["內容已自動保存爲本地草稿，下次新建時會繼續恢復。", "The content is saved as a local draft and will be restored the next time you create a note."],
  ["繼續編輯", "Keep editing"],
  ["放棄草稿", "Discard draft"],
  ["保留並退出", "Keep and exit"],
  ["丟棄本地變更？", "Discard local changes?"],
  ["此操作會移除這條待同步記錄，不會修改服務端筆記。", "This removes the queued local change without modifying the server note."],
  ["丟棄", "Discard"],
  ["正在同步新筆記", "New note is syncing"],
  ["首次同步完成後即可上傳本地圖片；圖片鏈接現在就可以直接粘貼到正文。", "Local images can be uploaded after the first sync. Image links can already be pasted into the note."],
  ["保存更改？", "Save changes?"],
  ["當前筆記有未保存修改。", "This note has unsaved changes."],
  ["放棄修改", "Discard changes"],
  ["無法打開資源", "Unable to open resource"],
  ["系統沒有可用應用打開此鏈接。", "No installed app can open this link."],
  ["已刪除筆記不能上傳附件，請先恢復筆記", "Deleted notes cannot receive attachments. Restore the note first."],
  ["圖片預覽", "Image preview"],
  ["放大", "Zoom in"],
  ["縮小", "Zoom out"],
  ["上一張", "Previous image"],
  ["下一張", "Next image"],
  ["打開原文件", "Open original file"],
  ["密碼已更新", "Password updated"],
  ["下次登錄請使用新密碼。", "Use the new password the next time you sign in."],
  ["編輯筆記", "Edit note"],
  ["所在筆記本", "Notebook"],
  ["筆記標題", "Note title"],
  ["筆記標籤", "Note tags"],
  ["選擇筆記本", "Choose notebook"],
  ["點選已有標籤，或輸入名稱創建新標籤", "Select existing tags or enter a name to create a new one"],
  ["搜索或輸入新標籤", "Search or enter a new tag"],
  ["沒有匹配的現有標籤，可直接新建", "No matching tags. You can create a new one."],
  ["新建", "Create"],
  ["{{count}} 條筆記", "{{count}} notes"],
  ["刷新 Token", "Refresh tokens"],
  ["Token 名稱", "Token name"],
  ["沒有正文預覽", "No content preview"],
  ["原生運行時啓動", "Native runtime startup"],
  ["啓動至 JS 執行", "Launch to JavaScript execution"],
  ["啓動至會話/緩存就緒", "Launch to session/cache ready"],
  ["啓動至工作區首幀", "Launch to workspace first frame"],
  ["啓動至列表數據就緒", "Launch to list data ready"],
  ["啓動至交互空閒", "Launch to interaction idle"],
  ["最近一次本地編輯器啓動", "Latest local editor startup"],
  ["正在啓動編輯器", "Starting editor"],
  ["編輯器啓動時間過長", "The editor is taking too long to start"],
  ["正在準備本地編輯器，筆記內容是安全的。", "Preparing the local editor. Your note is safe."],
  ["本地編輯器未能及時啓動，可以重試或返回，當前草稿不會丟失。", "The local editor did not start in time. You can retry or go back; your current draft will not be lost."],
  ["暫不可用", "Unavailable"],
  ["尚未記錄", "Not recorded"],
  ["正在搜索", "Searching"],
  ["退出搜索", "Exit search"],
  ["重置", "Reset"],
  ["置頂", "Pinned"],
  ["有標籤", "Tagged"],
  ["無標籤", "Untagged"],
  ["正在同步筆記", "Syncing your notes"],
  ["正在準備首次同步…", "Preparing your notes for the first sync…"],
  ["正在加載筆記", "Loading notes"],
  ["正在加載筆記本和筆記…", "Loading notebooks and notes…"],
  ["同步已暫停", "Sync paused"],
  ["已加載的筆記仍可使用，請檢查網絡後重試。", "Loaded notes remain available. Check your connection and retry."],
  ["已選擇 {{count}} 條", "{{count}} selected"],
  ["{{count}} 條結果", "Results: {{count}}"],
  ["篩選：{{filter}} · {{count}} 條", "Filter: {{filter}} · {{count}} notes"],
  ["已加載 {{loaded}} / {{total}} 條筆記", "Loaded {{loaded}} of {{total}} notes"],
  ["從模板新建", "New from template"],
  ["模板", "Templates"],
  ["選擇一個模板快速開始。所有模板都可以在網頁端修改或刪除。", "Choose a template to get started. Every template can be edited or deleted on the web."],
  ["模板暫時無法加載，請稍後重試。", "Templates could not load. Please try again later."],
  ["暫無模板。可在網頁端新建模板，或將常用筆記另存爲模板。", "No templates yet. Create one or save a note as a template on the web."],
  ["正在加載模板", "Loading templates"],
  ["新建筆記", "New note"],
  ["選擇創建方式", "Choose how to create"],
  ["空白筆記", "Blank note"],
  ["從空白頁開始記錄", "Start with an empty page"],
  ["使用會議紀要、週報等預設結構", "Use meeting notes, weekly reviews, and more"],
  ["模板", "Template"],
  ["應用模板？", "Apply template?"],
  ["當前內容將被模板內容替換。", "The current content will be replaced by the template."],
  ["替換", "Replace"],
  ["關閉", "Close"],
]);

const flattenStrings = (value: unknown, prefix = "", output = new Map<string, string>()) => {
  if (typeof value === "string") {
    output.set(prefix, value);
    return output;
  }
  if (!value || typeof value !== "object") {
    return output;
  }
  for (const [key, child] of Object.entries(value)) {
    flattenStrings(child, prefix ? `${prefix}.${key}` : key, output);
  }
  return output;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const createTranslationPair = (source: string, target: string): TranslationPair => {
  const placeholders: string[] = [];
  const patternSource = escapeRegExp(source).replace(/\\\{\\\{(\w+)\\\}\\\}/g, (_match, placeholder: string) => {
    placeholders.push(placeholder);
    return "(.+?)";
  });
  return {
    source,
    target,
    pattern: placeholders.length > 0 ? new RegExp(`^${patternSource}$`) : undefined,
    placeholders,
  };
};
const zhStrings = flattenStrings(zhCN);
const enStrings = flattenStrings(enUS);
const translationPairs: TranslationPair[] = Array.from(zhStrings.entries())
  .flatMap(([key, source]) => {
    const target = enStrings.get(key);
    if (!target || source === target) {
      return [];
    }
    return [createTranslationPair(source, target)];
  });
const exactTranslations = new Map(translationPairs.filter((pair) => !pair.pattern).map((pair) => [pair.source, pair.target]));
const mobileTemplateTranslations: TranslationPair[] = Array.from(mobileOnlyTranslations.entries())
  .filter(([source]) => source.includes("{{"))
  .map(([source, target]) => createTranslationPair(source, target));
const templateTranslations = [
  ...mobileTemplateTranslations,
  ...translationPairs.filter((pair) => pair.pattern),
].sort((left, right) => right.source.length - left.source.length);

const resolveSystemLocale = (): SupportedMobileLocale =>
  (Intl.DateTimeFormat().resolvedOptions().locale || "zh-CN").toLowerCase().startsWith("en") ? "en-US" : "zh-CN";

export const translateMobileText = (value: string, locale: SupportedMobileLocale) => {
  if (locale !== "en-US" || !/[\u3400-\u9fff]/.test(value)) {
    return value;
  }
  const exact = mobileOnlyTranslations.get(value) ?? exactTranslations.get(value);
  if (exact) {
    return exact;
  }
  for (const pair of templateTranslations) {
    const match = pair.pattern?.exec(value);
    if (!match) {
      continue;
    }
    return (pair.placeholders ?? []).reduce(
      (translated, placeholder, index) => translated.replace(`{{${placeholder}}}`, match[index + 1] ?? ""),
      pair.target
    );
  }
  return value;
};

let currentResolvedMobileLocale: SupportedMobileLocale = resolveSystemLocale();
export const translateCurrentMobileText = (value: string) => translateMobileText(value, currentResolvedMobileLocale);

const MobileLocaleContext = createContext<MobileLocaleContextValue>({
  preference: "system",
  resolvedLocale: resolveSystemLocale(),
  setPreference: () => undefined,
  translate: (value) => value,
});

export const MobileLocaleProvider = ({ children }: { children: ReactNode }) => {
  const [preference, setPreferenceState] = useState<MobileLocalePreference>("system");

  useEffect(() => {
    let active = true;
    void readMobileLocalePreference().then((storedPreference) => {
      if (active) {
        setPreferenceState(storedPreference);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const resolvedLocale = preference === "system" ? resolveSystemLocale() : preference;
  currentResolvedMobileLocale = resolvedLocale;
  const value = useMemo<MobileLocaleContextValue>(
    () => ({
      preference,
      resolvedLocale,
      setPreference: (nextPreference) => {
        setPreferenceState(nextPreference);
        void writeMobileLocalePreference(nextPreference);
      },
      translate: (text) => translateMobileText(text, resolvedLocale),
    }),
    [preference, resolvedLocale]
  );

  return <MobileLocaleContext.Provider value={value}>{children}</MobileLocaleContext.Provider>;
};

export const useMobileLocale = () => useContext(MobileLocaleContext);
