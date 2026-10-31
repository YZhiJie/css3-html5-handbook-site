# 漫画 · 第 53 话 资源与缓存策略

> 对应正文：[docs/perf/05-resource-caching.md](../../docs/perf/05-resource-caching.md) ｜ 原画：[EP.53-resource-caching.svg](./EP.53-resource-caching.svg)

## 登场角色

- **像素酱**：CSS 造型师，本话主角。凌晨发版，监控立刻告警：新用户白屏，老用户也白屏。她盯着"HTML 是新的"这点完全想不通。
- **标签君**：结构师，拿出发版事故的两个证据：HTML v2 指向新 chunk，缓存里却还是 app v1；以及首包 6MB 的体积账单。

## 剧情梗概

凌晨发版后，页面白屏。标签君定位到 `ChunkLoadError`：入口 HTML 更新了，但浏览器还在用一年前缓存里的旧 JS，新旧版本对不上。另一边，首包从 vendor 到 app 再加 CSS 共 6MB，下载加解析就要 4.1 秒。两个问题都指向同一件事：缓存策略没按资源类型设计。

## 分格解读

### 格1 · 痛点现场

HTML v2 是新下载的，它引用 `app.3f9a.js`；但旧版本用 `app.1b2c.js`，缓存里只有旧的，新 chunk 请求失败，路由直接白屏。另一种情况更常见：HTML 自己也被长缓存，用户永远看不到新版本。同时首包 6MB 里 vendor 占 3.2MB、app 1.8MB、CSS 1.0MB，一次全量下载，首屏根本等不起。

### 格2 · 机制登场

缓存决策树按"内容是否可寻址"分流：带 hash 的静态资源内容变则文件名变，可以 `max-age=31536000, immutable` 缓存一年；HTML 入口必须 `no-cache` 或极短缓存，每次用 ETag 协商；API 数据适合 `stale-while-revalidate`，先给旧值再后台刷新。Service Worker 侧对应三种策略：Cache First 服务静态资源，Network First 服务 HTML 与接口，SWR 服务可容忍短暂陈旧的数据。

### 格3 · 落地收束

改造后首包从 6MB 降到 1.2MB：路由分包，非首屏页面不下载；关键 chunk 用 `preload` 提前取。二次访问时间线变成：HTML 0.1s 协商、vendor 命中缓存 0ms、app 0.2s，FCP 0.4s。注意这里省下的是"重复下载"，不是"少加载"——该加载的仍然加载，只是从缓存来。

## 码叔划重点

1. 内容寻址：文件名带 hash，内容变则名变，才敢设一年长缓存。
2. HTML 不缓存：入口用 `no-cache` 或短缓存，避免新旧 JS 混搭白屏。
3. 按资源分策略：静态 Cache First，数据 SWR，入口 Network First。

## 自测一题

**问**：所有资源都设置了 `max-age=31536000, immutable`，为什么发版后用户还是白屏？

**答**：因为 HTML 也被长缓存了，用户拿到的还是旧入口，指向的旧 chunk 仍然存在，页面看似正常但永远是旧版本；一旦旧 chunk 被清理，就会变成 `ChunkLoadError` 白屏。正确做法是 HTML 用 `no-cache` 或 `max-age=0, must-revalidate`，静态产物用带 hash 的 immutable 长缓存，并在发版时保留上一版 chunk 一段时间，给灰度与回滚留窗口。

## 动手实验

- 发版缓存事故复现 + hash 长缓存 + SW 三策略演示：[examples/perf/05-resource-caching](../../examples/perf/05-resource-caching)
- 用 DevTools 的 Network 面板勾选 Disable cache 前后对比，观察 `from disk cache` 与 304 的差异。

## 下一话预告

缓存配好了，可上线之后没人知道到底快没快。第 54 话《性能审计与监控》——Lighthouse、火焰图、RUM 与 CI 预算门禁，把性能从一次性优化变成持续机制。
