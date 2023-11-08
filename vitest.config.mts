import path from "path";
import { fileURLToPath } from "url";
import type { AliasOptions } from "vite";
import solidPlugin from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

const r = (p: string) => path.resolve(path.dirname(fileURLToPath(import.meta.url)), p);

export const alias: AliasOptions = {
  "@techmely/types": r("./packages/types/src/"),
  "@techmely/utils": r("./packages/utils/src/"),
};

export default defineConfig({
  resolve: {
    alias,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      reporter: ["lcovonly"],
    },
    include: ["packages/**/test/**/*.test.ts?(x)"],
    exclude: ["node_modules", "packages/**/node_modules", "packages/**/dist"],
  },
  // plugins: [solidPlugin()],
});
