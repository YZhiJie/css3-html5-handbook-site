# cva + twMerge Button Demo

演示在组件库里如何组合使用 `cva`（class-variance-authority）+ `tailwind-merge` + `clsx`。

## 快速开始

```bash
npm install
npm run dev          # http://localhost:5173
npm run build
```

## 项目结构

```
mini-project/
├── index.html
├── vite.config.ts
├── package.json
└── src/
    ├── main.tsx
    ├── App.tsx              # 演示页面
    ├── index.css            # Tailwind v4 入口
    ├── lib/
    │   └── utils.ts         # ⭐ cn() = twMerge(clsx(...))
    └── components/
        ├── Button.tsx       # ⭐ cva + twMerge 实战
        └── Alert.tsx        # 另一个 cva 示例
```

## 三件套的分工

| 工具 | 解决什么 | 代码 |
| --- | --- | --- |
| `cva` | 声明式定义 variants schema | `cva("base", { variants: { ... } })` |
| `tailwind-merge` | 合并冲突的 Tailwind 类 | `twMerge("p-4", "p-8") → "p-8"` |
| `clsx` | 条件拼接类名（true/false/null 处理） | `clsx("a", cond && "b")` |

```ts
// ⭐ 社区标准：cn() 函数 = twMerge + clsx
// shadcn/ui、Radix UI、React Aria 全部用这个
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Button 组件的类名处理顺序

```
cn(
  buttonVariants({ variant, size, className }),
  className
)
```

实际执行：

1. `buttonVariants({ variant, size })` → 生成 base + variants + compoundVariants 的完整类名字符串
2. `twMerge` 把上面的结果和传入的 `className` 合并
3. **调用方 className 放最后 → 冲突时调用方赢**

## VariantProps 类型安全

```ts
// cva 自动生成 props 类型
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// 现在 TypeScript 知道：
// variant 只能是 "primary" | "outline" | "ghost" | "destructive" | "link"
// size 只能是 "sm" | "md" | "lg" | "icon"
<Button variant="xxx" />  // ❌ 类型错误
```

## compoundVariants 实战

```ts
const buttonVariants = cva("...", {
  variants: {
    variant: { primary: "...", ghost: "..." },
    size: { sm: "...", icon: "..." },
  },
  compoundVariants: [
    // variant + size 的特殊组合
    { size: "icon", className: "gap-0" },           // 图标按钮不要间距
    { variant: "link", className: "px-0 py-0" },    // link 模式不要 padding
  ],
});
```

## Tailwind v4 集成

```ts
// vite.config.ts — 一行搞定
plugins: [react(), tailwindcss()],

// src/index.css — 唯一配置
@import "tailwindcss";

@theme inline {
  --color-brand: #da373d;
}
```

v4 不需要 `tailwind.config.js`，也不需要 `postcss.config.js`。

## 为什么不直接用 clsx

```tsx
// ✗ 没有 twMerge：调用方 className 和组件默认的类会同时出现在 HTML 里
<button className={`${defaultClasses} ${overrideClasses}`} />
// 结果：class="p-4 p-8" — 两个 padding 都在，谁赢取决于 CSS 层叠顺序（不确定！）

// ✓ 有 twMerge：自动合并冲突
<button className={twMerge(defaultClasses, overrideClasses)} />
// 结果：class="p-8" — 后者赢，确定无疑
```

## 参考资料

- class-variance-authority：https://cva.style
- tailwind-merge：https://github.com/dcastil/tailwind-merge
- shadcn/ui：https://ui.shadcn.com （标杆实现）
- Radix UI Slot：https://www.radix-ui.com （twMerge 进阶）
