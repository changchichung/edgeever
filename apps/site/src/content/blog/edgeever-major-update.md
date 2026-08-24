---
draft: false
title: "EdgeEver 當前能力概覽：Cloudflare 自託管、開放 API 與 MCP"
snippet: "基於核心倉庫 README、文檔和代碼同步整理 EdgeEver 當前已經實現的產品能力。"
image: {
    src: "/images/major-update.jpg",
    alt: "EdgeEver 產品能力概覽"
}
publishDate: "2026-07-02 00:40"
category: "Product"
author: "EdgeEver Team"
tags: [updates, pwa, mcp, editor]
---

這篇文章同步核心倉庫中已經明確存在的能力。EdgeEver 當前定位是：開源、自託管、Cloudflare-native 的現代筆記工作區，保留經典印象筆記的三欄體驗，並提供 REST API、OpenAPI schema 和 Remote MCP endpoint。

以下內容來自同級 `edgeever` 核心倉庫的 README、文檔和實現結構。

---

### 1. 經典三欄筆記工作區

EdgeEver 保留熟悉的三欄佈局：

- 筆記本樹
- 筆記列表
- 主編輯區

它支持無限級嵌套筆記本、筆記本拖拽排序和調整層級、多選移動筆記、多選合併筆記，以及富文本編輯。

### 2. 開放內容模型

EdgeEver 同時保存三種內容形態：

```text
content_json      TipTap/ProseMirror 文檔，編輯器權威格式
content_markdown  API、Agent、導入導出使用
content_text      搜索、摘要和索引使用
```

這樣的設計讓前端編輯器、REST API、MCP、導入導出和搜索索引可以各自使用合適的數據形態。

### 3. Cloudflare-native 自託管

當前部署形態是一個 Cloudflare Worker：

- `/api/*` 由 Hono API 處理
- 前端靜態資源由 Workers Assets 提供
- D1 保存 notebooks、memos、memo_contents、resources 元數據等
- R2 保存圖片和附件對象

核心 README 中給出的個人使用估算是：短筆記可達 15 萬條，200KB 圖片約可存放 5 萬張。實際用量和費用仍以 Cloudflare 賬號計劃與官方定價爲準。

### 4. Web 端圖片壓縮與 PWA

網頁端上傳圖片前，可以在瀏覽器本地把 PNG、JPEG、WebP、AVIF 嘗試壓縮爲 WebP，並將最長邊限制在 `2560px` 以內。如果壓縮結果不比原圖小，則保留原圖。服務端不會額外執行 Cloudflare Images 式處理。

EdgeEver 也支持 PWA 安裝，前端使用 Workbox 和 Dexie 支撐離線草稿與本地同步隊列。

### 5. REST API、OpenAPI 與 MCP

EdgeEver 提供：

- REST API
- `/api/openapi.json`
- Remote MCP endpoint
- CLI 與 MCP stdio bridge 腳本

在 EdgeEver 左下角個人中心的 MCP 設置裏創建 API Token 後，可以複製 Token 或完整 MCP 配置交給 AI Agent，讓它讀取和整理你的筆記。

### 6. 更新到最新版

如果你是通過 Fork 部署的：

1. 打開你自己的 EdgeEver Fork 倉庫。
2. 點擊 GitHub 頁面上的 **Sync fork**，同步官方倉庫的最新代碼。
3. 已配置 Cloudflare Workers Builds 時，產生的 push 會自動構建、執行 D1 migration 併發布，無需回到本地重新部署。

如果是較早安裝的實例、尚未連接 Workers Builds，請先按 [Cloudflare Workers Builds 自動部署](/manual-deploy#開啓自動更新) 完成一次連接；之後再使用 **Sync fork** 更新。
