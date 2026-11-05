import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Tailwind v4：一个插件搞定一切
// - 不需要 postcss.config.js
// - 不需要 tailwind.config.js
// - Typography 插件在 src/index.css 里用 @plugin 加载
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
