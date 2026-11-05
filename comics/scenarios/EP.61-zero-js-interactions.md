# 漫画 · 第 61 话 零 JS 交互组件：:has() + 锚点定位 + popover + @starting-style

> 对应正文：[docs/scenarios/02-zero-js-interactions.md](../../docs/scenarios/02-zero-js-interactions.md) ｜ 原画：[EP.61-zero-js-interactions.svg](./EP.61-zero-js-interactions.svg)

## 登场角色

- **像素酱**：CSS 造型师。本话她花两天写的下拉菜单，一放进表格行就被 `overflow:hidden` 裁掉。
- **标签君**：结构师。负责把“状态、定位、顶层、入场”四件事拆给浏览器原生能力。

## 剧情梗概

像素酱的菜单用绝对定位 + JS 算坐标，打开时正常，滚动后错位，放进表格行还被裁剪。她试过把 `z-index` 调到 99999，没用。标签君让她改用 `popover` 进顶层，用 CSS 锚点定位跟随按钮，用 `:has()` 驱动按钮状态，用 `@starting-style` 做淡入。定位与事件代码从 300 行降到 8 行，只剩 aria 同步。

## 分格解读

### 格1 · 痛点现场

绝对定位浮层受包含块、`overflow`、`transform` 三层约束。JS 只在打开时算一次坐标，滚动与缩放后不更新；祖先一裁，菜单直接消失。`z-index` 只能解决同层叠顺序，解决不了裁剪上下文。

### 格2 · 机制登场

`popover` 把元素送进顶层，脱离祖先裁剪，并自带点击外部关闭、Esc 关闭与焦点管理。CSS 锚点定位在布局阶段解析锚点与目标的位置关系，`position-area` 描述九宫格方位，`position-try-fallbacks` 在空间不足时翻转。`@starting-style` 提供首次渲染的起始值，`allow-discrete` 让 `display` 也能过渡。`:has()` 让祖先根据后代状态改样式。

### 格3 · 落地收束

组合后的菜单：按钮设 `anchor-name`，浮层 `position-anchor` 绑定并 `position-area: block-end`；打开时通过 `:popover-open` 与 `@starting-style` 淡入；`.menu-wrap:has(.menu:popover-open)` 翻转箭头。滚动跟随、外部关闭、裁剪问题都由平台接管。像素酱保留 8 行 JS 同步 `aria-expanded`，因为 popover 不自动维护它。

## 码叔划重点

1. `popover` 进顶层，解决裁剪与层叠；但它默认居中，必须重置 `margin/inset`。
2. 锚点定位在布局阶段解析，滚动自动跟随，不需要读 `getBoundingClientRect`。
3. `@starting-style` 只管首次渲染帧；关闭动画要 `display … allow-discrete`。
4. `:has()` 让父级感知后代状态，但避免在超大 DOM 上写宽泛条件。

## 自测一题

**问**：菜单已经用了 `popover`，为什么还要写 `position-anchor` 和 `position-area`？

**答**：`popover` 只负责“进顶层 + 开关行为”，不负责“贴住触发按钮”。不写锚点定位时，浮层会按浏览器默认样式居中显示。`position-anchor` 绑定锚点，`position-area` 指定放在锚点的哪一侧，二者才让浮层跟随按钮并在空间不足时翻转。

## 动手实验

- 打开菜单、缩小容器高度、滚动页面，观察顶层与跟随行为：[examples/scenarios/02-zero-js-interactions](../../examples/scenarios/02-zero-js-interactions)
- 在 DevTools 中查看 `#menu` 是否位于 top layer，以及 `@starting-style` 的首帧效果。

## 下一话预告

单页内不写 JS 了，跨页导航还能连续吗？第 62 话《MPA 级转场》——View Transitions 与 Speculation Rules。
