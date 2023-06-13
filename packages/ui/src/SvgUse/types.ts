import type { JSX } from "solid-js";

type SvgId =
	| "brand-twitter"
	| "brand-linkedin"
	| "brand-facebook"
	| "brand-telegram"
	| "brand-google"
	| "outline-clock"
	| "ic-outline-add-link"
	| "icon-park-outline-send-email"
	| "tabler-search-outline"
	| "ic-baseline-clear-outline"
	| "material-symbols-logout-outline"
	| "cheveron-right-outline"
	| "cheveron-left-outline"
	| "cheveron-down-outline"
	| "cheveron-up-outline"
	| "close-outline"
	// In case you want to pass icon id dynamic
	| (string & {});

export interface SvgUseProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
	id?: SvgId;
	label?: string;
	basePath?: string;
}
