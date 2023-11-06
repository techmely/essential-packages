import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
  treeshake: "smallest",
  external: ["solid-js", "solid-js/web", "solid-js/store"],
  clean: true,
  sourcemap: true,
  minify: false,
  dts: true,
  splitting: true,
});
