import { getTsupOptions } from "./src/config";
import { defineConfig } from "tsup";
import pkg from "./package.json";

const universalOptions = getTsupOptions(pkg, {
	tsupOptions: {
		target: "node18",
		entry: ["src/index.ts", "src/**/*.ts"],
	},
});

export default defineConfig([universalOptions]);
