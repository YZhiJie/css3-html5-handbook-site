# Tailwind v4 设计系统骨架

一个生产级的 Tailwind v4 设计系统示例。

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev
# → 打开 http://localhost:5173

# 3. 生产构建
npm run build

# 4. 预览生产构建
npm run preview
```

## 项目结构

```
mini-project/
├── index.html
├── vite.config.ts           # 一行 Tailwind v4 集成
├── package.json
└── src/
    ├── main.tsx
    ├── App.tsx
    └── index.css            # ⭐ 所有设计令牌 + @theme + @layer 都在这里
```

## Tailwind v4 vs v3 对比

| 项目 | v3 | v4 |
| --- | --- | --- |
| 配置文件 | `tailwind.config.js` | 不需要 |
| PostCSS | 必须 `postcss.config.js` | 不需要 |
| 设计令牌位置 | `tailwind.config.js → theme.extend` | `src/index.css → @theme inline` |
| 扩展工具类 | `tailwind.config.js → plugins` | CSS 里写 `@utility` |
| 暗黑模式 | `darkMode: 'class' \| 'media'` | 默认自动（`light-dark()` CSS 函数） |
| 构建时间 | 基线 | 快 5–10×（Oxide Rust 引擎） |

## 设计令牌在哪里

所有设计令牌都在 `src/index.css` 的 `@theme inline {}` 块里。
修改一个值（比如把 `--color-primary: #da373d` 改成别的色），
整个应用的所有 `bg-primary` / `text-primary` / `border-primary` 立即同步。

## 暗黑模式

- `--color-bg` / `--color-text` 等变量用了 CSS `light-dark()` 函数
- **自动跟随系统主题**（`prefers-color-scheme: dark`）
- 如需手动切换，加 `.dark` class 到 `<html>` 上即可（v4 自动生成回退）

```html
<!-- 手动开启暗黑 -->
<html class="dark">
```

## 体积

- 生产构建 CSS ≈ **25KB gzip**（对比 v3 约 45KB）
- 原因：v4 内建 PurgeCSS + 更高效的 CSS 生成 + Oxide Rust 引擎

## 没有 postcss.config.js 也没有 tailwind.config.js

Tailwind v4 不再依赖 PostCSS。`@tailwindcss/vite` 插件直接解析 `@import "tailwindcss"` 和 `@theme`。
**这是刻意的简化——一个文件搞定一切配置。**

## 浏览器兼容性

| 浏览器 | 最低版本 |
| --- | --- |
| Chrome / Chromium | 88 |
| Firefox | 78 |
| Safari | 13.1 |
| iOS Safari | 13.1 |
| Android WebView | 88 |

暗黑模式的 `light-dark()` 函数需要 Safari 17.4+，不支持时 v4 自动用 `.dark` class 回退。

## 参考资料

- Tailwind v4 官方文档：https://tailwindcss.com/docs
- @theme：https://tailwindcss.com/docs/theme
- 迁移指南：https://tailwindcss.com/docs/upgrade-guide
