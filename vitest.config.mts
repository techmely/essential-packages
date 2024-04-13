import path from "path";
import { fileURLToPath } from "url";
import type { AliasOptions } from "vite";
import { defineConfig } from "vitest/config";

const r = (p: string) =>
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), p);

export const alias: AliasOptions = {
  "@techmely/types": r("./ts-packages/types/src/"),
  "@techmely/utils": r("./ts-packages/utils/src/"),
};

export default defineConfig({
  resolve: {
    alias,
  },
  test: {
    globals: true,
    setupFiles: ["./ts-packages/utils/vitest-setup.ts"],
    environment: "happy-dom",
    coverage: {
      reporter: ["lcovonly"],
    },
    include: ["ts-packages/**/**/**/*.test.?(m)ts?(x)"],
    exclude: ["node_modules", "ts-packages/**/node_modules", "ts-packages/**/dist"],
  },
});
