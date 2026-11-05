# 漫画 · 第 51 话 GPU 合成与渲染性能

> 对应正文：[docs/perf/03-gpu-compositing.md](../../docs/perf/03-gpu-compositing.md) ｜ 原画：[EP.51-gpu-compositing.svg](./EP.51-gpu-compositing.svg)

## 登场角色

- **像素酱**：CSS 造型师，本话主角。写了个"丝滑"的卡片入场动画，真机上却像幻灯片；为了保险又给每张卡加了 `will-change`，结果更卡。
- **标签君**：结构师，在白板上画出 Style → Layout → Paint → Composite → GPU 的流水线，指出到底哪几站可以跳过。

## 剧情梗概

像素酱用 `left` 做位移动画，又把 60 张卡片的 `will-change: transform` 全部打开。帧率掉到 12fps，显存告急。标签君没有让她继续调参数，而是先画渲染流水线：动 `left` 每帧都要重新布局和绘制，动 `transform` 只走合成；而合成层不是免费的，每一层都是一张要占显存的纹理。问题从"动画写法"变成了"预算问题"。

## 分格解读

### 格1 · 痛点现场

左边是属性选错：`left` 属于布局属性，每一帧都要重新计算布局、重绘，再合成上屏，主线程根本来不及。右边是层滥用：`will-change` 会提前把元素提升为独立合成层，60 张卡片就是 60 层纹理，显存与合成开销一起爆。两个错误叠加，滚动直接变成 PPT。

### 格2 · 机制登场

渲染流水线五站：Style（样式计算）、Layout（布局）、Paint（绘制）、Composite（合成）、GPU（上屏）。只有 `transform`、`opacity` 这类合成属性可以跳过 Layout 与 Paint，直接从 Composite 开始。合成层树把页面拆成多个纹理，由 GPU 单独变换后拼回去，所以动画流畅；但层数越多，纹理面积越大，显存占用越高——层是预算，不是免费的加速开关。

### 格3 · 落地收束

同一动画改成 `transform: translate3d()`，并且只给滑动容器提升一次层，掉帧从 42 次降到 0，合成层从 61 降到 3，帧率回到 58fps。三条铁律写在卡片上：只动合成属性、层提升只给容器一次、先看 FPS 与 Layers 面板再决定提升。优化顺序永远是"测量 → 定位 → 最小改动"。

## 码叔划重点

1. 动画只动 `transform` / `opacity`，别动 `left`、`top`、宽高这类触发布局的属性。
2. 合成层是预算：`will-change` 不是越多越好，每层都要显存与合成开销。
3. 先测量再提升：看 FPS、掉帧与 Layers 面板，找到真凶再加 hack。

## 自测一题

**问**：给列表容器加了 `will-change: transform`，列表项滚动反而更卡，为什么？

**答**：`will-change` 让容器提前成为合成层，但列表项本身如果也有阴影、圆角裁剪或 `position: sticky`，浏览器可能为子元素再建层，层数暴涨；同时大面积的容器纹理每次内容变化都要重新栅格化。正确做法是确认动画确实只在容器上做 transform，再提升一次；滚动容器优先用 `overscroll-behavior` 与 `contain` 控制影响范围，而不是无脑加 `will-change`。用完即撤，别长期挂着。

## 动手实验

- `left` vs `transform` 掉帧对照 + Layers 面板观察：[examples/perf/03-gpu-compositing](../../examples/perf/03-gpu-compositing)
- 打开 Chrome DevTools 的 Rendering → Frame Timing / Layer borders，边调 `will-change` 边看层数与掉帧。

## 下一话预告

动画顺了，计算又堵住了主线程。第 52 话《主线程与长任务治理》——80 万行数据导出直接白屏，输入框打字没反应，看任务切片与 Worker 怎么救场。
