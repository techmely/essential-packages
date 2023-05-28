import * as dialog from "@zag-js/dialog";
import { normalizeProps, useMachine } from "@zag-js/solid";
import {
	Show,
	createMemo,
	createUniqueId,
	type ParentComponent,
	useContext,
	createContext,
	Accessor,
	Component,
	JSX,
} from "solid-js";
import { Portal } from "solid-js/web";
import { SvgUse } from "./SvgUse";

type Props = {
	isOpen: boolean;
	title: string;
	description: string;
	onClose: () => void;
};

const DialogContext = createContext<Accessor<ReturnType<typeof dialog.connect>>>();
export const useDialog = () => useContext(DialogContext);

// export const DialogTitle: Component<JSX.HTMLAttributes<HTMLHeadingElement>> = (props) => {
// 	const api = useDialog();
// 	return <h2 {...api?.().titleProps} {...props} />;
// };

// export const DialogDescription: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = ({
// 	children,
// 	...rest
// }) => {
// 	const api = useDialog();
// 	return (
// 		<div {...api?.().descriptionProps} {...rest}>
// 			{children}
// 		</div>
// 	);
// };

export const Dialog: ParentComponent<Props> = ({
	children,
	isOpen,
	title,
	description,
	onClose,
}) => {
	const [state, send] = useMachine(dialog.machine({ id: createUniqueId() }));

	const api = createMemo(() => dialog.connect(state, send, normalizeProps));

	return (
		<DialogContext.Provider value={api}>
			<Show when={api().isOpen}>
				<Portal>
					<div {...api().backdropProps} />
					<div {...api().containerProps}>
						<div {...api().contentProps}>
							<h2 {...api().titleProps}>{title}</h2>
							<p {...api().descriptionProps}>{description}</p>
							<button type="button" {...api().closeTriggerProps}>
								<SvgUse id="close-outline" class="w-4 h-4 text-gray-800" />
							</button>
							{children}
						</div>
					</div>
				</Portal>
			</Show>
		</DialogContext.Provider>
	);
};
