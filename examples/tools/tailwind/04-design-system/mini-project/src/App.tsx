export default function App() {
  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-4xl mx-auto">

        {/* Hero：动态响应式字号 */}
        <header className="text-center mb-12">
          <h1 className="font-display text-hero font-bold tracking-tight">
            Tailwind v4 设计系统
          </h1>
          <p className="mt-3 text-text-muted text-sm md:text-base">
            一个完整的生产级设计系统骨架，全部配置写在
            <code className="bg-surface px-1.5 py-0.5 rounded mx-1">src/index.css</code>
            的 <code className="bg-surface px-1.5 py-0.5 rounded">@theme inline {"{}"}</code> 里。
          </p>
        </header>

        {/* 语义色 Tag 展示 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">🎨 语义色 + 状态标签</h2>
          <div className="card space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="tag tag-success">✅ 成功</span>
              <span className="tag tag-warning">⚠️ 警告</span>
              <span className="tag tag-danger">❌ 错误</span>
              <span className="tag tag-info">ℹ️ 信息</span>
            </div>

            <div className="h-px bg-border" />

            {/* 纯工具类写法（不用 @layer） */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-primary text-white px-3 py-1 rounded-md text-sm">
                bg-primary
              </span>
              <span className="bg-primary/80 text-white px-3 py-1 rounded-md text-sm">
                bg-primary/80（半透明）
              </span>
              <span className="bg-primary-soft text-primary px-3 py-1 rounded-md text-sm">
                bg-primary-soft
              </span>
            </div>
          </div>
        </section>

        {/* 暗黑模式演示 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">🌙 暗黑模式（自动）</h2>
          <div className="card">
            <p className="text-sm text-text-muted mb-2">
              切换系统主题设置（设置 → 外观 → 深色），观察下方元素的背景、文字、边框色自动切换。
              无需写任何 JS，
              <code className="bg-surface px-1 rounded">light-dark()</code> CSS 函数原生实现。
            </p>
            <div className="grid gap-3 md:grid-cols-3 mt-4">
              <div className="bg-bg border border-border rounded-lg p-4 text-center text-sm">
                bg-bg
              </div>
              <div className="bg-card-bg border border-border rounded-lg p-4 text-center text-sm">
                bg-card-bg
              </div>
              <div className="bg-surface border border-border rounded-lg p-4 text-center text-sm">
                bg-surface
              </div>
            </div>
          </div>
        </section>

        {/* 字体 & 圆角演示 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">📐 字体 & 圆角阶梯</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="card">
              <p className="text-xs text-text-muted mb-3">字体族</p>
              <div className="space-y-2">
                <p className="font-display text-xl">font-display — Poppins + Inter</p>
                <p className="font-sans text-base">font-sans — Inter + Noto Sans SC</p>
                <p className="font-mono text-sm">font-mono — ui-monospace</p>
              </div>
            </div>
            <div className="card">
              <p className="text-xs text-text-muted mb-3">圆角阶梯</p>
              <div className="flex items-end gap-3">
                <div className="bg-primary h-12 w-12 rounded-sm flex items-center justify-center text-white text-xs">
                  sm 6px
                </div>
                <div className="bg-primary h-12 w-12 rounded-md flex items-center justify-center text-white text-xs">
                  md 8px
                </div>
                <div className="bg-primary h-12 w-12 rounded-lg flex items-center justify-center text-white text-xs">
                  lg 12px
                </div>
                <div className="bg-primary h-12 w-12 rounded-card flex items-center justify-center text-white text-xs">
                  card 16px
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Elevation 阴影演示 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">🖼️ Elevation 阴影阶梯</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
            <div className="bg-card-bg rounded-lg p-4 shadow-xs text-center text-sm border border-border">xs</div>
            <div className="bg-card-bg rounded-lg p-4 shadow-sm text-center text-sm border border-border">sm</div>
            <div className="bg-card-bg rounded-lg p-4 shadow-md text-center text-sm border border-border">md</div>
            <div className="bg-card-bg rounded-lg p-4 shadow-lg text-center text-sm border border-border">lg</div>
            <div className="bg-card-bg rounded-lg p-4 shadow-xl text-center text-sm border border-border">xl</div>
          </div>
        </section>

        {/* 按钮组合 */}
        <section className="bg-surface rounded-lg p-5">
          <h2 className="text-lg font-semibold mb-4">🎯 按钮组合（纯工具类，不写 @layer）</h2>
          <div className="flex flex-wrap gap-3">
            <button className="bg-primary hover:bg-primary-hover active:bg-primary-active
                               text-white font-medium rounded-md px-4 py-2
                               transition-colors">
              Primary
            </button>
            <button className="border border-border rounded-md px-4 py-2
                               hover:bg-bg transition-colors">
              Outline
            </button>
            <button className="text-text-muted rounded-md px-4 py-2
                               hover:text-text hover:bg-bg transition-colors">
              Ghost
            </button>
            <button className="bg-surface text-text-muted rounded-md px-4 py-2
                               opacity-60 cursor-not-allowed" disabled>
              Disabled
            </button>
          </div>
          <p className="text-xs text-text-muted mt-3">
            💡 v4 中所有按钮的 hover/active/dark 状态都直接写在 class 里，不需要单独写 CSS。
          </p>
        </section>

        <footer className="mt-12 text-center text-xs text-text-muted">
          Tailwind v4.1.1 · 生产构建 CSS 约 25KB gzip ·
          <code className="bg-surface px-1 rounded">@theme inline</code> 单一真源
        </footer>

      </div>
    </div>
  );
}
