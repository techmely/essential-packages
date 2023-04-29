import type { Options } from "tsup";
import pkg from "./package.json";

export default <Options>{
	target: "node18",
	entry: ["src/index.ts"],
	clean: true,
	format: ["cjs", "esm"],
	dts: true,
	external: [...Object.keys(pkg.peerDependencies)],
};
