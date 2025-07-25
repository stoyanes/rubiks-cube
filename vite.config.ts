import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
    coverage: {
      provider: "v8",
      exclude: [
        ".storybook",
        "dist",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/**/*.stories.tsx",
        "**/*.config.ts",
        "**/*.config.js",
      ],
    },
  },
} as UserConfig);
