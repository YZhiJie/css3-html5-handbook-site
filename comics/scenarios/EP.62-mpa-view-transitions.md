# 漫画 · 第 62 话 MPA 级转场：View Transitions + Speculation Rules

> 对应正文：[docs/scenarios/03-mpa-view-transitions.md](../../docs/scenarios/03-mpa-view-transitions.md) ｜ 原画：[EP.62-mpa-view-transitions.svg](./EP.62-mpa-view-transitions.svg)

## 登场角色

- **像素酱**：CSS 造型师。本话她把内容站从 SPA 迁回 MPA，首屏快了，但每次点链接都白屏闪一下。
- **标签君**：结构师。负责把“视觉连续”和“文档预取”拆成两层渐进增强。

## 剧情梗概

迁回 MPA 后，首屏加载从 2.4s 降到 0.9s，可页面切换像回到十年前：旧页瞬间消失，新页白屏后再出现。像素酱想装回 SPA，标签君拦住她：跨文档 View Transitions 可以让 MPA 也有形变，Speculation Rules 可以提前准备下一页。两层都不支持时，普通导航仍然可用。

## 分格解读

### 格1 · 痛点现场

传统 MPA 导航有两次空档：离开旧页的瞬间没有过渡，新页首帧之前没有内容。用户感知为“闪白”。加载动画只能遮住第二次空档，遮不住第一次的结构断裂。

### 格2 · 机制登场

`@view-transition { navigation: auto }` 让浏览器在导航时对旧页截图、按 `view-transition-name` 提取元素，再与新页同名元素插值。名字必须全页唯一且新旧页都存在，否则退化为淡入淡出。Speculation Rules 用 JSON 声明 `prefetch` 或 `prerender`，`eagerness` 控制触发时机；预取把网络等待提前到用户犹豫时。

### 格3 · 落地收束

像素酱给头部、文章封面、标题设唯一名字；列表页对文章链接加 `prerender`，`eagerness: moderate`；保留原加载态作为不支持浏览器的兜底；`prefers-reduced-motion` 下缩短形变。支持转场的浏览器跨页切换连续，预取命中时导航 200ms 内完成，不支持的环境仍是普通 MPA。

## 码叔划重点

1. `view-transition-name` 必须唯一且稳定，重复命名会让整组动画失效。
2. 给大量元素命名会生成大量截图与伪元素，合成开销明显。
3. 预取不是越多越好：`eagerness` 越高命中率越高，也越费流量与 CPU。
4. 两项能力都是渐进增强，基础导航必须首先可用。

## 自测一题

**问**：给列表页所有卡片都设 `view-transition-name: card`，为什么转场反而不动了？

**答**：`view-transition-name` 在同一页面必须唯一。多元素同名会让浏览器无法确定哪个旧元素对应哪个新元素，整组转场被放弃。应按数据 ID 生成唯一名字，如 `card-${id}`，并只为需要形变的少量元素命名，避免合成开销。

## 动手实验

- 点击卡片观察封面与标题的形变，返回列表观察反向插值：[examples/scenarios/03-mpa-view-transitions](../../examples/scenarios/03-mpa-view-transitions)
- 模拟预取命中与未命中，对比日志中的导航耗时说明。

## 下一话预告

场景篇收官。第 63 话起进入架构篇：《设计令牌的分层与落地》——把颜色、间距、字体变成可治理的契约。
