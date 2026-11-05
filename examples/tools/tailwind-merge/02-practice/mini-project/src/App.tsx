import { Button } from "./components/Button";
import { Alert } from "./components/Alert";
import { cn } from "./lib/utils";

export default function App() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-2 text-brand">
        cva + twMerge 组件实战
      </h1>
      <p className="text-slate-500 text-sm mb-10">
        Button 和 Alert 组件用 cva 定义 variants schema，
        用 <code className="bg-slate-100 px-1 rounded text-xs">cn()</code>（twMerge + clsx）
        处理 className 覆盖，冲突类自动合并。
      </p>

      {/* ============ 1. Button variants ============ */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">🎯 Button variants 全部选项</h2>

        <div className="space-y-4">
          {/* 每个 variant 默认 md 尺寸 */}
          <div className="flex items-center gap-3 flex-wrap">
            <Button>primary（默认）</Button>
            <Button variant="outline">outline</Button>
            <Button variant="ghost">ghost</Button>
            <Button variant="destructive">destructive</Button>
            <Button variant="link">link</Button>
          </div>

          {/* 每个 size */}
          <div className="flex items-center gap-3">
            <Button size="sm">sm</Button>
            <Button size="md">md（默认）</Button>
            <Button size="lg">lg</Button>
            <Button size="icon" aria-label="图标">🚀</Button>
          </div>

          {/* compoundVariants 自动触发：icon + 任意 variant → gap-0 */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" aria-label="outline icon">
              <span>🎨</span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="ghost icon">
              <span>👻</span>
            </Button>
          </div>
        </div>
      </section>

      {/* ============ 2. ⭐ 核心演示：调用方 className 覆盖 ============ */}
      <section className="mb-12 bg-yellow-50 rounded-lg border border-yellow-200 p-5">
        <h2 className="text-lg font-semibold mb-2 text-yellow-800">
          ⭐ 关键演示：调用方 className 精准覆盖
        </h2>
        <p className="text-sm text-yellow-700 mb-4">
          Button 默认是 <code className="bg-yellow-100 px-1 rounded">h-10 px-4 text-sm</code>。
          看看调用方怎么精准覆盖。twMerge 保证冲突类只保留最后出现的那个。
        </p>

        <div className="space-y-3">

          {/* 覆盖 padding */}
          <div className="bg-white rounded-md p-3 border border-yellow-200">
            <p className="text-xs text-slate-500 mb-2">调用方加 <code className="bg-slate-100 px-1 rounded">px-8 py-1</code>：</p>
            <Button className="px-8 py-1">
              twMerge 自动把 px-8 py-1 覆盖 h-10 px-4 的 padding
            </Button>
          </div>

          {/* 覆盖 hover 颜色 */}
          <div className="bg-white rounded-md p-3 border border-yellow-200">
            <p className="text-xs text-slate-500 mb-2">调用方覆盖 hover 效果：</p>
            <Button variant="ghost" className="hover:bg-red-100 hover:text-red-600">
              variant=ghost 默认 hover 是 bg-slate-100 → 调用方改成红色 ✅
            </Button>
          </div>

          {/* 多个样式覆盖 */}
          <div className="bg-white rounded-md p-3 border border-yellow-200">
            <p className="text-xs text-slate-500 mb-2">调用方大改：bg → 渐变，rounded → full，加 shadow：</p>
            <Button className="bg-gradient-to-r from-pink-500 to-fuchsia-500
                               hover:from-pink-600 hover:to-fuchsia-600
                               rounded-full shadow-lg">
              完全自定义外观 ✅
            </Button>
          </div>

          {/* 禁用态（TwMerge 不影响 disabled 样式） */}
          <div className="bg-white rounded-md p-3 border border-yellow-200">
            <p className="text-xs text-slate-500 mb-2">disabled 属性（组件内置 disabled:opacity-50，twMerge 保留）：</p>
            <Button disabled>禁用的 primary</Button>
            <Button variant="outline" disabled className="ml-3">禁用的 outline</Button>
          </div>
        </div>
      </section>

      {/* ============ 3. Alert variants ============ */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">💬 Alert variants</h2>
        <div className="space-y-3 max-w-xl">
          <Alert variant="destructive">
            <strong>出错了！</strong> 网络请求失败，请检查连接。
          </Alert>
          <Alert variant="success">
            <strong>成功！</strong> 数据已保存。
          </Alert>
          <Alert variant="info">
            <strong>提示</strong>：我们刚刚更新了条款。
          </Alert>
          <Alert variant="warning">
            <strong>注意</strong>：此操作不可撤销。
          </Alert>
        </div>
      </section>

      {/* ============ 4. cn() 不依赖组件库 ============ */}
      <section className="bg-slate-50 rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-3">🔧 cn() 到处可用</h2>
        <p className="text-sm text-slate-600 mb-3">
          <code className="bg-slate-100 px-1 rounded">cn()</code> 不是组件专用的——它是项目里所有 Tailwind 类名处理的统一入口：
        </p>
        <div className="space-y-2 font-mono text-xs bg-slate-900 text-slate-100 p-4 rounded">
          <div><span style="color:#c084fc">// 按钮：cva + className</span></div>
          <div><span style="color:#c084fc">className</span>={cn(<span style="color:#86efac">buttonVariants</span>({'{'} variant, size {'}'}), className)}</div>
          <div className="mt-2"><span style="color:#c084fc">// 任意 div：条件样式</span></div>
          <div><span style="color:#c084fc">className</span>={cn(<span style="color:#86efac">"bg-white rounded-lg"</span>, isActive &amp;&amp; <span style="color:#86efac">"ring-2 ring-blue-500"</span>, className)}</div>
          <div className="mt-2"><span style="color:#c084fc">// twMerge 保证冲突只保留最后一个</span></div>
          <div>twMerge(<span style="color:#86efac">"p-4"</span>, <span style="color:#86efac">"p-8"</span>) → <span style="color:#86efac">"p-8"</span></div>
          <div>clsx(<span style="color:#86efac">"p-4"</span>, <span style="color:#86efac">"p-8"</span>) → <span style="color:#86efac">"p-4 p-8"</span>（不知道冲突）</div>
        </div>
      </section>

    </div>
  );
}
