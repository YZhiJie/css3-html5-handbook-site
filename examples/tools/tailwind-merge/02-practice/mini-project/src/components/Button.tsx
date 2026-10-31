/* ========================================================================
 *  Button 组件 —— cva + twMerge 组合拳
 *
 *  这是 shadcn/ui 的 Button.tsx 简化版，演示：
 *  1. cva 定义 variants schema（variant / size）
 *  2. compoundVariants 处理特殊组合
 *  3. cn() = twMerge + clsx 合并调用方 className 覆盖
 *  4. VariantProps<typeof buttonVariants> 自动生成 TypeScript 类型
 * ======================================================================== */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ========================
 * 1. 定义 variants schema
 * ======================== */

const buttonVariants = cva(
  // base：所有按钮都有的基础样式
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      // variant：视觉变体
      variant: {
        primary: "bg-brand text-white hover:bg-brand/90",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-slate-200 bg-white hover:bg-slate-50",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        link: "text-blue-500 underline-offset-4 hover:underline",
      },
      // size：尺寸变体
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    // compoundVariants：特殊组合覆盖
    compoundVariants: [
      // 任何 variant + icon 尺寸 → 去掉 gap（纯图标按钮不需要间距）
      { size: "icon", className: "gap-0" },
      // link 模式 → 去掉所有 padding（它是行内链接样式）
      { variant: "link", className: "px-0 py-0 h-auto" },
    ],
    // 默认值
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/* ========================
 * 2. 从 cva 自动推导 props 类型
 * ======================== */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/* ========================
 * 3. 实现组件
 *
 * 关键：cn(buttonVariants({ variant, size, className }))
 *       调用方的 className 放在最后一个参数 → 冲突时调用方赢
 * ======================== */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
