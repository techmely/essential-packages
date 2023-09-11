import { defineConfig } from "tsup";
import pkg from "./package.json";
import { getTsupOptions } from "./src/config";

const universalOptions = getTsupOptions(pkg, {
  tsupOptions: {
    treeshake: false,
    target: "node18",
    entry: ["src/index.ts", "src/**/*.ts"],
  },
});

export default defineConfig([universalOptions]);
