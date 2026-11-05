# 漫画 · 第 58 话 合成层与 GPU 加速的真实条件

> 对应正文：[docs/mechanism/04-compositing-and-gpu.md](../../docs/mechanism/04-compositing-and-gpu.md) ｜ 原画：[EP.58-compositing-gpu.svg](./EP.58-compositing-gpu.svg)

## 登场角色

- **像素酱**：CSS 造型师。本话她给全站卡片批量加上 `translateZ(0)` 和 `will-change`，坚信“提层就快”。
- **标签君**：结构师。负责打开 Layers 面板，用层数与显存把“加速”的真相摆出来。

## 剧情梗概

像素酱听说“GPU 加速”能救低端机，于是给 80 张卡片全部加 `will-change: transform`。上线后滚动反而更卡，手机还发烫。标签君打开 Layers 面板：80 多个合成层，纹理吃掉近 200MB 显存。删掉常驻提示、只给正在动画的元素临时提层后，帧率从 25 回到 58。

## 分格解读

### 格1 · 痛点现场

满屏卡片都标了 `will-change`，浏览器为每张卡保留独立纹理。滚动时合成线程不停上传、回收纹理，带宽与显存都吃紧。像素酱看到的“层数很多”以为是好事，实际是典型的层爆炸：每层都要栅格化、都要占显存。

### 格2 · 机制登场

合成层让元素可以只改变换矩阵或透明度，跳过布局与绘制。但提层有真实条件：3D 变换、`will-change` 提示、与动画层重叠、fixed、video/canvas、filter 等。普通元素写个静态 `transform` 不一定提层。而且提层不省首次栅格化，也不省显存，层越多合成与带宽开销越大。

### 格3 · 落地收束

正确姿势是按需：交互开始前加 `will-change`，`transitionend` 后撤掉；动画只碰 transform/opacity；大面积阴影改用伪元素 opacity；屏外模块用 `content-visibility`。像素酱把 80 层降到 12 层，显存降一个量级，滚动恢复 55–60fps。

## 码叔划重点

1. 有 transform 样式 ≠ 自动提层；浏览器按需判断，别把提示当命令。
2. `will-change` 用完即撤，常驻会保留纹理与层，移动端代价高。
3. 合成友好动画只碰 transform/opacity；不要过渡 box-shadow、width、left。
4. 用 DevTools Layers 面板看层数与显存，不要凭代码猜。

## 自测一题

**问**：为什么加了 `translateZ(0)` 后，文字有时反而变模糊？

**答**：元素被提升为独立合成层后，文字在该层的纹理上栅格化。若图层缩放比例、像素对齐与主层不同，纹理会按不同采样率生成，看起来就模糊。关键文本不应强制提层；必须提层时避免非整数缩放，并在真机上检查清晰度。

## 动手实验

- left 与 transform 双轨道帧率对比、will-change 开关：[examples/mechanism/04-compositing-and-gpu](../../examples/mechanism/04-compositing-and-gpu)
- 打开 DevTools → Layers，观察两个轨道元素的层归属与显存估算。

## 下一话预告

层也提了，动画还是偶尔抖。第 59 话《渲染时序：rAF、ResizeObserver 循环与任务切分》——把每一帧安排明白。
