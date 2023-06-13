import { Component } from "solid-js";
import { SvgUseProps } from "./types";

const SvgUse: Component<SvgUseProps> = ({
	id = "close-outline",
	label = `Present ${id} Icon`,
	basePath,
	...rest
}) => {
	const baseAssetPath = `${basePath || ""}/images/svg/all.svg#${id}`;
	return (
		// rome-ignore lint/a11y/noSvgWithoutTitle: Bug in romes a11y lint
		<svg role="img" aria-label={label} {...rest}>
			<use href={baseAssetPath} />
		</svg>
	);
};

export default SvgUse;
