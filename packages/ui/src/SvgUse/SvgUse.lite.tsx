import type { JSX } from "@builder.io/mitosis/jsx-runtime";
import type { StringEnum } from "@techmely/types";

type SvgId = StringEnum<
	| "cheveron-right-outline"
	| "cheveron-left-outline"
	| "cheveron-down-outline"
	| "cheveron-up-outline"
>;

interface Props extends JSX.SvgSVGAttributes<SVGAElement> {
	id: SvgId;
	label?: string;
	className?: string;
}

export default function SvgUse({ id, label = "Presentation Icon", className, ...rest }: Props) {
	return (
		<svg role="img" aria-label={label} className={className} {...rest}>
			<use href={`/images/svg/all.svg#${id}`} />
		</svg>
	);
}
