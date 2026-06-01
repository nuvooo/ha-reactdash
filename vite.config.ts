import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Library builds don't auto-replace process.env.NODE_ENV; React references it,
  // so without this the browser throws "process is not defined".
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: "src/main.tsx",
      formats: ["es"],
      fileName: () => "ha-reactdash.js",
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
  test: {
    globals: true,
    environment: "node",
    exclude: ["node_modules/**", ".gstack/**", ".superpowers/**"],
  },
});
