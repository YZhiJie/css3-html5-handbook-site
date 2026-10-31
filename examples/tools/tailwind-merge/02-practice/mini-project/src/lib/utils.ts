/* ========================================================================
 *  cn() —— shadcn/ui 风格的类名合并工具
 *
 *  社区标准：tailwind-merge 处理 Tailwind 冲突，clsx 处理条件拼接
 *  组件库里的 className prop 都应该走这个函数
 * ======================================================================== */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
