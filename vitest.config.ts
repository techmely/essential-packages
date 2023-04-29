import { fileURLToPath } from "url";
import path from "path";
import type { AliasOptions } from "vite";
import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";

const r = (p: string) => path.resolve(path.dirname(fileURLToPath(import.meta.url)), p);

export const alias: AliasOptions = {
	"@techmely/types": r("./packages/types/src/"),
	"@techmely/utils": r("./packages/utils/src/"),
};

export default defineConfig({
	plugins: [viteReact()],
	resolve: {
		alias,
	},
	test: {
		globals: true,
		environment: "happy-dom",
		coverage: {
			reporter: ["lcovonly"],
		},
		include: ["packages/**/test/**/*.test.ts"],
		exclude: ["node_modules", "packages/**/node_modules", "packages/**/dist"],
	},
});
