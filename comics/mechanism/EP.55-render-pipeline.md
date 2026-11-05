# 漫画 · 第 55 话 渲染管线：从 DOM 到像素的一帧

> 对应正文：[docs/mechanism/01-render-pipeline.md](../../docs/mechanism/01-render-pipeline.md) ｜ 原画：[EP.55-render-pipeline.svg](./EP.55-render-pipeline.svg)

## 登场角色

- **像素酱**：CSS 造型师。本话她想让卡片“动得高级”，结果一改宽度就掉帧，被管线图上了一课。
- **标签君**：结构师。负责把 JS、Style、Layout、Paint、Composite 五段摊开，标出每类属性触发的范围。

## 剧情梗概

像素酱做了一个横向滑动的卡片墙，用 `left` 逐帧推进，元素一多就卡成 PPT。她怀疑是电脑不行，标签君打开 Performance 面板：每帧都有一条紫色 Layout。换成 `transform` 后，同样的位移只剩一条绿色 Composite。标签君说：你不是算得慢，是让浏览器每帧重排了一遍。

## 分格解读

### 格1 · 痛点现场

卡片墙 120 个元素，每个都改 `left`。火焰图里 Function 之后紧跟 Layout，Layout 之后又 Paint，一帧主线程被塞满。像素酱的“顺滑”只在小数据量下成立——元素一多，布局成本线性上升，帧预算瞬间击穿。

### 格2 · 机制登场

一帧的顺序是 JS → Style → Layout → Paint → Composite，后一段依赖前一段。改 `width/left/margin` 会让布局脏掉，后面全要重跑；改 `transform/opacity` 只影响合成阶段，布局与绘制结果可以复用。合成线程能独立推进图层变换，所以主线程再忙，纯合成动画也能保持流畅。

### 格3 · 落地收束

优化不是背属性清单，而是看失效范围：能用 transform 表达的位移就用 transform；必须改尺寸的交互接受一次重排；屏外内容用 `content-visibility` 跳过。DevTools 里勾选 Layout/Paint，谁在跑一目了然。像素酱把卡片墙改成 transform，掉帧从 38 降到 2。

## 码叔划重点

1. 管线五段有依赖：改了布局输入，Layout/Paint/Composite 全要重跑。
2. `transform` 与 `opacity` 是合成友好属性，前提是元素具备独立合成条件。
3. 优化第一步是看 DevTools 的 Layout/Paint 条，不是猜哪个属性快。
4. `will-change` 是提示不是命令，常驻会制造图层与显存开销。

## 自测一题

**问**：把抽屉动画从 `left` 改成 `transform` 后，为什么主线程仍然可能卡？

**答**：如果抽屉没有独立合成层，或者动画期间仍在回调里读取布局、修改尺寸，主线程依旧要工作。另外首次栅格化、超大阴影、`backdrop-filter` 都会把成本转移到绘制/合成。要确认 Layers 面板是否真的提层，并保证动画只碰 transform/opacity。

## 动手实验

- 三种动画写法对比帧率与长任务：[examples/mechanism/01-render-pipeline](../../examples/mechanism/01-render-pipeline)
- 打开 DevTools Performance 勾选 Layout/Paint，对照示例切换模式录制。

## 下一话预告

位移讲清了，位置却还会“跑偏”。第 56 话《包含块与格式化上下文》——绝对定位参照谁、margin 为什么会穿透父级，一次说透。
