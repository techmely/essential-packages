import type { UserConfig } from "@unocss/core";
import type { Theme } from "@unocss/preset-uno";

export const tmlUnoConfigs: UserConfig<Theme> = {
	theme: {
		animation: {
			keyframes: {
				"collapsible-slide-down":
					"{from{height:0}to{height:var(--radix-collapsible-content-height)}}",
				"collapsible-slide-up":
					"{from{height:var(--radix-collapsible-content-height)}to{height: 0}}",
			},
			durations: {
				"collapsible-slide-down": "300ms",
				"collapsible-slide-up": "300ms",
			},
			timingFns: {
				"collapsible-slide-down": "ease-out",
				"collapsible-slide-up": "ease-out",
			},
		},
	},
	shortcuts: [
		["text-primary", "text-emerald-500 dark:text-emerald-300"],
		["text-main", "text-gray-300 dark:text-[#E4E4EC]"],
		["text-light", "text-gray-800"],
		["text-secondary", "text-gray-700"],
		["bg-primary", "bg-emerald-500 dark:bg-emerald-300"],
		["bg-default", "bg-gray-1000 dark:bg-[#131313]"],
		["bg-paper", "bg-gray-900/60 dark:bg-gray-200/60"],
		["skeleton-loading", "animate-pulse bg-gray-350"],
		[
			"collapsible-content",
			"overflow-hidden [&[data-state=open]]:animate-collapsible-slide-down [&[data-state=closed]]:animate-collapsible-slide-up",
		],
		{
			textarea:
				"text-xl text-text-primary font-be-vn w-full border-transparent resize-none appearance-none bg-transparent outline-none outline-offset-2",
			"btn-base":
				"inline-flex items-center justify-center btn-small px-4 py-2 text-base leading-6 text-text-primary whitespace-nowrap border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
			"btn-primary":
				"bg-primary text-white border-primary-main focus:ring-violet-300 hover:bg-primary-main disabled:bg-primary-light disabled:bg-violet-200",
			"btn-secondary": "bg-blue-600 border-blue-700 focus:ring-blue-500",
			"btn-outlined": "",
			"btn-contained": "",
			"btn-text": "",
			"btn-shine":
				"relative rounded px-5 py-2.5 overflow-hidden group bg-primary-main relative hover:bg-gradient-to-r hover:from-primary-main hover:to-primary-light text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary-light transition-all ease-out duration-300",
			"btn-shine-effect":
				"absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease",
			"btn-small": "h-8",
			"btn-medium": "h-10",
			"btn-large": "h-12",
			body1: "tml text-base",
			body2: "tml text-sm",
			divider: "h-1 bg-gray-200",
			skeleton: "animate-pulse bg-gray-200",
			"icon-btn":
				"inline-flex items-center justify-center rounded-full bg-transparent cursor-pointer outline-0 border-0 m0 select-none appearance-none text-center p1 text-xl focus:(ring-2 ring-offset-2 outline-none)",
			"icon-btn-sm": "square-8",
			"icon-btn-md": "square-10",
			"icon-btn-lg": "square-12",
		},
		// dynamic shortcuts
		[/^stack-(\d+)$/, ([, stack]) => `flex items-center space-x${stack}`],
		["flex-center", "flex items-center justify-center"],
	],
	rules: [
		[/^mw-inline-(\d+)$/, ([, d]) => ({ "margin-inline": `max(0px, 50% - ${d}px / 2)` })],
		[/^square-(\d+)$/, ([, d]) => ({ width: `${+d / 4}rem`, height: `${+d / 4}rem` })],
	],
};
