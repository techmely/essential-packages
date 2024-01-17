import { defineConfig } from "tsup";
import pkg from "./package.json";
import { getTsupOptions } from "./src/config";

const universalOptions = getTsupOptions(pkg, {
  tsupOptions: {
    treeshake: true,
    target: "node18",
    format: ["cjs", "esm"],
    entry: ["src/index.ts", "src/**/*.ts"],
  },
});

export default defineConfig([universalOptions]);
