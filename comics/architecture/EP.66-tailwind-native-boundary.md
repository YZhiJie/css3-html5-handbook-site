# 漫画 · 第 66 话 Tailwind 与原生 CSS 的边界

> 对应正文：[docs/architecture/04-tailwind-native-css-boundary.md](../../docs/architecture/04-tailwind-native-css-boundary.md) ｜ 原画：[EP.66-tailwind-native-boundary.svg](./EP.66-tailwind-native-boundary.svg)

## 登场角色

- **标签君**：结构师。本话他接手一个「全量 Tailwind」项目，发现十二个页面有十二种按钮内边距。
- **像素酱**：CSS 造型师。她主张组件契约必须回到原生 CSS，复杂状态更不该用工具类拼。

## 剧情梗概

项目把按钮、输入框、卡片都用工具类拼装。半年后三件事爆发：同一按钮在十二个页面有十二种内边距；暗色主题有十八处硬编码颜色漏改；复杂下拉状态用 `group-has-*` 堆到不可读。标签君和像素酱重新划边界：原子能力留工具类，组件契约进 `@layer components`，复杂状态回归原生 CSS。

## 分格解读

### 格1 · 痛点现场

工具类的优势是局部与可组合，代价是一致性依赖配置与评审。当组件契约也交给工具类，每个使用点都要重复状态、焦点与禁用样式；一处需求变化，就要改遍所有模板。任意值 `p-[13px]` 则直接绕过设计约束。

### 格2 · 机制登场

Tailwind v4 生成 `@layer theme, base, components, utilities`，工具类位于最高层，所以 `class="btn px-4"` 里的 `px-4` 会覆盖 `.btn` 的内边距——这是设计行为，不是 bug。`@theme` 同时输出工具类与 CSS 变量，组件可以直接消费同一份令牌，避免两套色值。

### 格3 · 落地收束

边界原则很简单：间距、颜色、排版等单维度调整用工具类；按钮、卡片、表单的结构、状态、变体用原生 CSS；`:has()`、容器查询、`@starting-style`、伪元素装饰回原生；主题与令牌用原生变量。结果是按钮内边距收敛为三档，暗色漏改降为零。

## 码叔划重点

1. 工具类赢在局部可组合，组件 CSS 赢在契约集中，二者是分工不是替代。
2. 理解层顺序：utilities 覆盖 components 是设计如此，覆盖失效先查层，不要加 `!important`。
3. 令牌单一来源：先有令牌，再映射到工具类与组件 CSS，避免两套色值。
4. 任意值不是禁用，而是需要评审；一次性像素值应回填到令牌。
5. 复杂状态回归原生 CSS，可读性与可测试性都更好。

## 自测一题

**问**：`<button class="btn btn--primary px-5">` 中，`px-5` 为什么能覆盖 `.btn` 里写的 `padding-inline`？

**答**：因为 Tailwind 把工具类放进 `utilities` 层，而组件类在 `components` 层。分层后先比层顺序，utilities 高于 components，所以工具类胜出，与选择器特异性无关。这正是工具类做局部微调的机制；若覆盖不生效，应先检查两个类是否真的落在对应层，而不是提高特异性。

## 动手实验

- 在示例中切换「纯工具类 / 组件契约 / 分层混合」三种写法，对比维护成本与覆盖结果：[examples/architecture/04-tailwind-native-css](../../examples/architecture/04-tailwind-native-css)
- 给按钮加一个 `px-5` 工具类，观察它如何覆盖组件层内边距。

## 下一话预告

架构篇收官。第 67 话起进入质量门禁篇：《视觉回归测试》——把「看起来没变」变成可自动判定的证据。
