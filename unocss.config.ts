import { defineConfig, transformerVariantGroup } from "unocss";
import { tmlUnoConfigs } from "./packages/ui/uno.config";

export default defineConfig({
	...tmlUnoConfigs,
	transformers: [transformerVariantGroup()],
});
