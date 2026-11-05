# Mini Design System —— Dart Sass 架构演示

这是一个完整的、可编译的 **Dart Sass mini design system**，演示了 SMACSS 7-1 模式、双层 Token 架构、`@each`/`@for` 批量生成等核心概念。

## 目录结构

```
05-advanced/
├── _tokens.scss    ← 设计令牌（颜色、间距、断点、阴影、字体）
├── _mixins.scss    ← 公共 mixin + 函数 + 双层 token 注入
├── _reset.scss     ← base 层：CSS 变量注入 + 全局 reset + 排版
├── main.scss       ← 入口：components + utilities 层
└── README.md       ← 本文件
```

## 运行方式

```bash
# 前置：npm install sass@^1.85.0 -D

# 一次性编译
npx sass examples/tools/sass/05-advanced/main.scss \
        examples/tools/sass/05-advanced/output.css

# 监听模式（开发推荐）
npx sass --watch examples/tools/sass/05-advanced/main.scss \
        examples/tools/sass/05-advanced/output.css

# 生产压缩
npx sass --style=compressed --no-source-map \
        examples/tools/sass/05-advanced/main.scss \
        examples/tools/sass/05-advanced/output.min.css
```

## 架构亮点

### 1. 双层 Token 架构

```
Sass 变量层（_tokens.scss）
     ↓  @include define-theme-vars() 注入
CSS 变量层（:root / .dark-mode）
     ↓  组件里写 var(--color-primary)
运行时可切换的主题
```

- Sass 编译时用 `color.adjust()` 自动算出 dark 版颜色（**不会出现两套颜色不一致的 bug**）；
- 组件层写 `var(--color-primary)` 就能自动响应 light/dark 切换；
- JS 一行代码切换主题：`document.body.classList.toggle('dark-mode')`。

### 2. SMACSS 分层

| 层 | 文件 | 产出 CSS？ | 说明 |
| --- | --- | --- | --- |
| abstracts | `_tokens` / `_mixins` | 否 | 纯变量/函数/mixin |
| base | `_reset` | 是 | reset + CSS 变量 + 排版 |
| components | `main.scss` 里的 `.btn` / `.card` | 是 | 可复用组件，用 @each 批量生成变体 |
| utilities | `main.scss` 里的 `.p-*` / `.d-*` | 是 | 工具类，@each/@for 批量生成 |

### 3. 编译体积诊断

```bash
# 压缩后看真实体积
npx sass --style=compressed --no-source-map \
        examples/tools/sass/05-advanced/main.scss /tmp/final.css

# gzip 后看网络传输体积
gzip -c /tmp/final.css | wc -c
```

### 4. 模块私有成员

- 私有函数：`_px-to-rem()` （函数/mixin 私有前缀是 `_`）
- 公开函数：`rem()`、`sp()`
- 私有变量在这个 mini 示例里没有使用（简单起见），复杂库里会用 `$_internal` 前缀

### 5. 编译产物预览

```css
:root {
  --color-primary: #3b82f6;
  --color-text: #1f2937;
  --space-4: 16px;
  /* ... */
}

.dark-mode {
  --color-primary: #60a5fa;    /* 自动计算 */
  --color-text: #f1f5f9;
}

.btn {
  display: flex; align-items: center; justify-content: center;
  background: var(--color-primary, #3b82f6);
  /* ... */
}
.btn--sm { height: 32px; }
.btn--primary { background: var(--color-primary); color: #fff; }
.btn--danger  { background: var(--color-danger);  color: #fff; }

/* 工具类 */
.p-0 { padding: 0px; }
.p-1 { padding: 4px; }
.p-2 { padding: 8px; }
/* ... 15 种间距 × 6 种方向 = 90 个工具类，1 行 @each 生成 */

@media (min-width: 576px) { .d-none-sm { display: none !important; } }
@media (min-width: 768px) { .d-none-md { display: none !important; } }
/* ... 4 个断点 × 3 个可见性 = 12 个响应式工具类 */
```
