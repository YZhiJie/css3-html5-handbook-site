# 漫画 · 第 57 话 布局计算与强制同步布局

> 对应正文：[docs/mechanism/03-layout-and-forced-sync.md](../../docs/mechanism/03-layout-and-forced-sync.md) ｜ 原画：[EP.57-forced-sync-layout.svg](./EP.57-forced-sync-layout.svg)

## 登场角色

- **像素酱**：CSS 造型师。本话她写了个“等高卡片”循环，200 张卡片让页面卡了半秒。
- **标签君**：结构师。负责画出脏标记与强制布局的因果链，演示“全读全写”的改造。

## 剧情梗概

像素酱想把卡片拉成等高，循环里读一张 `offsetHeight` 就写一张 `minHeight`。结果每次循环都触发一次完整布局，200 次重排把主线程堵死。标签君把火焰图放大：Layout 事件层层叠叠，全是自己逼出来的。她改成“先读全部，再写全部”，布局次数从 200 降到 2。

## 分格解读

### 格1 · 痛点现场

代码是 `el.style.minHeight = el.offsetHeight + 'px'` 的循环。写之后立刻读，浏览器无法等到帧边界，只能当场清脏标记、同步算完布局。元素越多，强制布局次数越多，耗时呈线性增长，且每次都把后续样式计算拖下水。

### 格2 · 机制登场

浏览器默认异步布局：一帧内多次修改先累积，帧边界统一算一次。但读取 `offsetWidth/getBoundingClientRect/getComputedStyle` 会要求“现在就要准确几何”，于是强制同步布局。修复范式是把逻辑拆成 measure 与 mutate 两段：先全读进数组，再统一写回，中间不穿插读取。

### 格3 · 落地收束

像素酱的改造：第一遍 map 读出所有高度求最大值，第二遍 forEach 统一写 `minHeight`。再用 `contain:layout` 收窄重排边界，滚动场景用 rAF 合并高频读取。火焰图里 Layout 从“密密麻麻”变成“一帧一条”，单次按键耗时从 26ms 降到 4ms。

## 码叔划重点

1. 几何读取 API 会强制同步布局：`offset*`、`client*`、`scroll*`、`getBoundingClientRect`。
2. 读写交错 = layout thrashing；全读 → 全写 = 一帧一次布局。
3. 能用 CSS 表达的布局（`calc`、flex、grid）不要交给 JS 测量。
4. ResizeObserver 回调里只记录尺寸，写入放下一帧，避免循环。

## 自测一题

**问**：把读和写拆开后，为什么总耗时可能还是很高？

**答**：拆开只减少“布局次数”，不减少总计算量。如果单次布局本身很大（元素多、层级深、复杂选择器），仍需用 `contain` 缩小边界、`content-visibility` 跳过屏外内容、减少 DOM 规模。布局性能是“次数 × 单次成本”的乘积。

## 动手实验

- 交错 vs 批量的 200 元素实测：[examples/mechanism/03-layout-and-forced-sync](../../examples/mechanism/03-layout-and-forced-sync)
- 在 Performance 面板录制，搜索 Layout 事件数量对比两种写法。

## 下一话预告

布局省了，绘制也想省。第 58 话《合成层与 GPU 加速的真实条件》——为什么你加的 `translateZ(0)` 反而更卡。
