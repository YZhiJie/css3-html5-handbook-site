# 漫画 · 第 56 话 包含块与格式化上下文

> 对应正文：[docs/mechanism/02-containing-block-formatting-context.md](../../docs/mechanism/02-containing-block-formatting-context.md) ｜ 原画：[EP.56-containing-block.svg](./EP.56-containing-block.svg)

## 登场角色

- **像素酱**：CSS 造型师。本话她给卡片加了个入场动画，绝对定位的角标立刻跑到了屏幕角落。
- **标签君**：结构师。负责画出包含块链与格式化上下文，解释“谁参照谁、谁隔离谁”。

## 剧情梗概

像素酱的角标本来贴卡片右上角，加了 `transform` 动画后跑到外层容器边缘。她以为是 z-index 的锅，标签君摇头：transform 创建了包含块，绝对定位的参照系换了人。另一边，父子 margin 折叠让面板顶部凭空多出一截，`overflow:hidden` 又裁掉了阴影。两个 bug，一个根因：没弄清包含块与格式化上下文。

## 分格解读

### 格1 · 痛点现场

角标 `position:absolute; top:8px; right:8px`，卡片没有定位祖先时，它参照更外层的定位容器；给卡片加 `transform: translateZ(0)` 后，卡片成为包含块，角标突然贴到卡片内边距盒。像素酱的动画只是“加了个变换”，布局契约却被悄悄改写。

### 格2 · 机制登场

包含块决定百分比尺寸与 inset 的参照矩形：static/relative 参照最近块容器，absolute 参照最近已定位祖先，fixed 参照视口；`transform/filter/contain:paint` 即使 static 也会创建包含块。格式化上下文决定排布与隔离：BFC 能包含浮动、阻断 margin 折叠；Flex/Grid 各自建立 FFC/GFC。

### 格3 · 落地收束

修复手法各有对应：角标问题给卡片显式 `position:relative` 或把浮层 Portal 到 body；margin 穿透用 `display:flow-root` 而不是 `overflow:hidden`；浮动塌陷同样用 flow-root。像素酱把“加动画”改成“先声明定位契约”，角标归位，阴影也不再被裁。

## 码叔划重点

1. `transform`、`filter`、`contain:paint` 会创建包含块，动画属性会改写定位参照。
2. `display:flow-root` 是建立 BFC 的首选，副作用比 `overflow:hidden` 小。
3. Flex/Grid 子项没有普通流的 margin 折叠，别混用 BFC 解释。
4. 绝对定位元素必须有显式定位祖先，别依赖“碰巧”。

## 自测一题

**问**：父级加了 `overflow:hidden` 后 margin 折叠消失了，但下拉菜单也被裁掉了，怎么改？

**答**：把父级的 `overflow:hidden` 换成 `display:flow-root`。两者都能建立 BFC 阻断 margin 折叠，但 flow-root 不裁剪溢出内容，适合包含下拉、阴影、焦点环的容器。若确实需要裁剪，应把浮层移到 body 或使用 popover 顶层。

## 动手实验

- 切换定位祖先 / transform / contain，观察角标参照系：[examples/mechanism/02-containing-block-formatting-context](../../examples/mechanism/02-containing-block-formatting-context)
- 对比普通块与 flow-root 的 margin 折叠、浮动包裹效果。

## 下一话预告

位置对了，为什么一读尺寸就卡？第 57 话《布局计算与强制同步布局》——layout thrashing 的读写交错现场。
