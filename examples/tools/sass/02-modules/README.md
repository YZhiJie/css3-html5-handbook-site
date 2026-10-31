# 示例 02：Dart Sass 模块系统（@use / @forward / partials）

## 目录结构

```
02-modules/
├── _tokens.scss    ← partial：设计令牌（颜色/间距/断点）
├── _mixins.scss    ← partial：公共 mixin + 函数
├── main.scss       ← 入口：会被编译成 main.css
└── README.md       ← 本文件
```

## 运行方式

```bash
# 前置：确保项目里已安装 sass
cd css3-html5-handbook
npm i sass@^1.85.0 -D

# 一次性编译
npx sass examples/tools/sass/02-modules/main.scss \
        examples/tools/sass/02-modules/output.css

# 或者指定 load-path（更稳妥）
npx sass --load-path=examples/tools/sass/02-modules \
        examples/tools/sass/02-modules/main.scss \
        examples/tools/sass/02-modules/output.css

# 监听模式（改动 .scss 自动重编译）
npx sass --watch --load-path=examples/tools/sass/02-modules \
        examples/tools/sass/02-modules/main.scss \
        examples/tools/sass/02-modules/output.css
```

## 演示亮点

1. **@forward + @use 顺序**：`main.scss` 里 @forward 在 @use 之前（Dart Sass 强制）
2. **as * 命名空间消除**：两个文件的公开成员全部暴露到 main.scss 根命名空间
3. **私有变量隔离**：`_mixins.scss` 里的 `$_px-to-rem`、`$_bp-media` 外部不可访问；`@include flex-center` / `@include respond-to('md')` 公开可用
4. **原生模块**：`@use 'sass:math'` 提供 `math.div`、`math.clamp`、`math.has-key` 等
5. **partials 约定**：下划线前缀的 `_tokens.scss` / `_mixins.scss` 不参与独立编译，CLI 只编译 `main.scss`
6. **@each 遍历断点 map 生成响应式工具类**：产出 `.hide-sm`、`.show-md-only` 等规则

## 编译产物预览

编译后 output.css 会包含：

```css
.btn--sm { height: 32px; padding: 0 19.2px; }
.btn--md { height: 40px; padding: 0 24px; }
.btn--lg { height: 52px; padding: 0 31.2px; }

@media (min-width: 768px) {
  .card { padding: 32px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
}

@media (min-width: 576px) { .hide-sm { display: none !important; } }
@media (min-width: 768px) { .hide-md { display: none !important; } }
...
```
