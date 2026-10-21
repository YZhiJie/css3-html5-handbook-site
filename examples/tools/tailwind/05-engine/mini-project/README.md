# Tailwind Typography Plugin Demo

演示 Tailwind v4 的 `@plugin` 加载官方 Typography 插件。

## 快速开始

```bash
npm install
npm run dev          # http://localhost:5173
npm run build
```

## 关键文件

| 文件 | 说明 |
| --- | --- |
| `src/index.css` | 加载 Typography 插件 + 设计令牌 |
| `src/App.tsx` | 渲染 markdown 内容 + `.prose` class |

## v4 里的 Typography 用法

```css
/* src/index.css */
@import "tailwindcss";

/* 加载官方插件 */
@plugin "@tailwindcss/typography";
```

```tsx
// 任意 HTML 内容外面套 prose 即可自动排版
<article className="prose prose-lg prose-slate">
  {/* markdown 渲染后的 HTML 或手写 HTML */}
</article>
```

### `.prose` 的变体

| 类名 | 效果 |
| --- | --- |
| `.prose` | 默认字号 + 行高 |
| `.prose-sm` | 小字号（适合侧边栏） |
| `.prose-lg` | 大字号（适合阅读） |
| `.prose-xl` / `.prose-2xl` | 更大 |
| `.prose-slate` | slate 灰色系（默认） |
| `.prose-zinc` / `.prose-neutral` / `.prose-stone` | 其他灰色系 |
| `.prose-invert` | 反色（适合深色背景） |

## Play CDN 不支持 @plugin

这是 Play CDN 的设计定位——浏览器端没有 npm 环境。替代方案：自己在 `<style>` 里手写 `.prose` 样式（约 30 行 CSS 可以覆盖标题/段落/列表/代码/引用/表格）。

## 其他官方插件

```css
@plugin "@tailwindcss/forms";
/* 美化原生表单控件（select/input/textarea/checkbox） */

@plugin "@tailwindcss/aspect-ratio";
/* v4 已内建 aspect-video / aspect-square，通常不需要 */

@plugin "@tailwindcss/container-queries";
/* 容器查询变体（比原生 @container 更友好的语法） */
```

## 与 Sass 的关系

- v4 官方声明：**Tailwind CSS itself is your preprocessor**
- 如果项目必须用 Sass，把 Tailwind v4 部分放在 `.css` 文件，Sass 部分放 `.scss`，分开处理
- **不要**在 `.scss` 文件里写嵌套的 `@theme` —— Dart Sass 会改写结构

## 浏览器兼容性

Typography 产物是标准排版 CSS，兼容所有现代浏览器。

## 参考资料

- Typography 插件文档：https://tailwindcss.com/docs/plugins#typography
- 插件源码：https://github.com/tailwindlabs/tailwindcss/tree/main/packages/%40tailwindcss/typography
