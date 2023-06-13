import { cva, type VariantProps } from "class-variance-authority";
import { JSX, ParentComponent, Show } from "solid-js";
import SvgUse, { type SvgUseProps } from "../SvgUse";

const buttonVariants = cva(
	"flex-center rounded-md text-sm transition-colors focus-visible:(outline-none ring-2 ring-offset-2) disabled:(opacity-50 cursor-not-allowed) ring-offset-gray-100",
	{
		variants: {
			variant: {
				primary: "bg-primary text-gray-300 hover:bg-primary bg-opacity-90",
				outline: "bg",
				secondary: "bg-blue-600 border-blue-700 focus:ring-blue-500",
				ghost: "",
				link: "underline-offset-4 hover:underline text-primary",
				shine:
					"relative rounded px-5 py-2.5 overflow-hidden group bg-primary-main relative hover:bg-gradient-to-r hover:from-primary-main hover:to-primary-light text-white hover:ring-2 hover:ring-offset-2 hover:ring-primary-light transition-all ease-out duration-300",
				"shine-effect":
					"absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease",
				icon: "rounded-full select-none appearance-none",
			},
			size: {
				default: "py-2 px-4",
				sm: "px-3",
				lg: "px-5",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	startIcon?: SvgUseProps;
}

const Button: ParentComponent<ButtonProps> = ({ children, variant, size, startIcon, ...props }) => {
	return (
		<button type="button" class={buttonVariants({ variant, size })} {...props}>
			<Show when={startIcon}>
				<SvgUse {...startIcon} id={startIcon?.id} />
			</Show>
			{children}
		</button>
	);
};

export default Button;
