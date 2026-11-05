/* ========================================================================
 *  Alert 组件 —— 另一个 cva + twMerge 示例
 *
 *  展示：
 *  - 单一 variants 组
 *  - 调用方 className 精准覆盖
 *  ======================================================================== */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4",
  {
    variants: {
      variant: {
        default:     "bg-white text-slate-900 border-slate-200",
        destructive: "bg-red-50 border-red-500/50 text-red-600",
        success:     "bg-green-50 border-green-500/50 text-green-700",
        info:        "bg-blue-50 border-blue-500/50 text-blue-700",
        warning:     "bg-yellow-50 border-yellow-500/50 text-yellow-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  );
}
