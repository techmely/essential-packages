import { getTsupOptions } from "../utils/src/config";
import { defineConfig } from "tsup-preset-solid";
import pkg from "./package.json";

const now = new Date();

export const TECHMELY_BANNER = (packageName: string) => `
/*!
 * ${packageName}
 * Copyright(c) 2021-${now.getFullYear()} Techmely <techmely.creation@gmail.com>
 * MIT Licensed
 */
`;

export default defineConfig(
	{
		entry: "src/index.ts",
	},
	{
		tsupOptions(config) {
			return {
				...config,
				format: ["cjs", "esm"],
				clean: true,
				treeshake: true,
				banner: {
					js: TECHMELY_BANNER(pkg?.name || "open-sources"),
				},
			};
		},
	},
);
