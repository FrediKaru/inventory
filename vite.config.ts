import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/components/tests/setup.js",
  },
  build: {
    target: "esnext", // or 'es2022' to support top-level await
  },
});
