export default function App() {
  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold text-center mb-2">
        Tailwind Typography 插件演示
      </h1>
      <p className="text-center text-slate-500 text-sm mb-10">
        v4 里用 <code className="bg-slate-100 px-1 rounded">@plugin "@tailwindcss/typography"</code> 加载
      </p>

      {/* =======================================================================
       *  prose + prose-lg + prose-slate
       *  prose 是 Typography 插件提供的主 class，给内部所有 HTML 元素自动套样式
       * ======================================================================= */}
      <article className="prose prose-lg prose-slate max-w-none">

        <h1>Tailwind v4 入门</h1>
        <p>
          Tailwind CSS v4 是 2025 年最新稳定版，核心变化是从"配置文件驱动"转向"纯 CSS 驱动"。
          不再需要 <code>tailwind.config.js</code>，一切配置都写在 CSS 里。
        </p>

        <h2>快速开始</h2>
        <p>只要两步：</p>
        <ol>
          <li>安装依赖：<code>npm install tailwindcss @tailwindcss/vite</code></li>
          <li>在 CSS 里写 <code>@import "tailwindcss"</code></li>
        </ol>

        <h2>核心特性</h2>
        <ul>
          <li><strong>Oxide 引擎</strong>：Rust 实现，比 v3 快 5–100×</li>
          <li><strong>CSS-first</strong>：@theme / @utility / @variant 都是纯 CSS at-rule</li>
          <li><strong>Play CDN</strong>：双击 HTML 即跑，零构建</li>
          <li><strong>内建 PurgeCSS</strong>：生产构建自动 tree-shaking</li>
        </ul>

        <h2>代码示例</h2>
        <pre><code>{`@import "tailwindcss";

@theme {
  --color-brand: #da373d;
}

/* HTML 里自动生成 bg-brand / text-brand */
<div class="bg-brand text-white">按钮</div>`}</code></pre>

        <blockquote>
          <p>v4 不只是升级，更是范式转变——Tailwind CSS itself is your preprocessor.</p>
        </blockquote>

        <h2>表格</h2>
        <table>
          <thead>
            <tr><th>版本</th><th>引擎</th><th>配置</th></tr>
          </thead>
          <tbody>
            <tr><td>v3</td><td>Node + PostCSS</td><td>tailwind.config.js</td></tr>
            <tr><td>v4</td><td>Rust (Oxide)</td><td>CSS @theme</td></tr>
          </tbody>
        </table>

        <h2>更多资料</h2>
        <p>
          访问 <a href="https://tailwindcss.com/docs">tailwindcss.com/docs</a> 查看完整文档。
        </p>

      </article>

      <div className="mt-10 text-center text-xs text-slate-400">
        💡 Play CDN 不支持 @plugin → 在 Play CDN 里请自己手写 .prose 样式
      </div>
    </div>
  );
}
