import { invariant } from "@techmely/utils/invariant";
import {
  Accessor,
  ParentComponent,
  Signal,
  createComponent,
  createContext,
  useContext,
} from "solid-js";
import { FlowContainer } from "./flow.container";
import { ComputedFlow, FlowState, ProxyFlowState, ProxySignal } from "./flow.types";
import { C_FLOW_NOT_OWNER } from "./flow.utils";

const FlowStateContext = createContext<FlowContainer>();

export const FlowStateProvider: ParentComponent = (props) => {
  const container = new FlowContainer();

  return createComponent(FlowStateContext.Provider, {
    value: container,
    get children() {
      return props.children;
    },
  });
};

export function useFlowState<T>(pebble: FlowState<T>): Signal<T>;
export function useFlowState<T>(pebble: ComputedFlow<T>): Accessor<T>;
export function useFlowState<T, A, V>(pebble: ProxyFlowState<T, A, V>): ProxySignal<T, A, V>;
export function useFlowState<T, A, V>(
  flow: FlowState<T> | ComputedFlow<T> | ProxyFlowState<T, A, V>,
): Signal<T> | Accessor<T> | ProxySignal<T, A, V> {
  const ctx = useContext(FlowStateContext);
  invariant(ctx, C_FLOW_NOT_OWNER);

  switch (flow.type) {
    case "flow":
      return ctx.getFlowState(flow as FlowState<T>);
    case "computed":
      return ctx.getComputed(flow as ComputedFlow<T>);
    case "proxy":
      return ctx.getProxy(flow as ProxyFlowState<T, A, V>);

    default:
      throw new Error("Unknown flow's type");
  }
}
