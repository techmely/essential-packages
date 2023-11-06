import type {
  ActionMatchable,
  AnyAction,
  ComputationFlowContext,
  ComputationFlowState,
  ComputationFlowStateWithInit,
  ComputationFlowStateWithoutInit,
  ComputationOptions,
  ComputationWithInitOptions,
  ComputationWithInitial,
  ComputationWithoutInitOptions,
  ComputationWithoutInitial,
  FlowState,
  FlowStateOptions,
  Lazy,
  ProxyFlowOptions,
  ProxyFlowState,
} from "./flow.types";
import { getIncreaseID } from "./flow.utils";

export function defineFlowState<T>(initValue: Lazy<T>, options?: FlowStateOptions<T>) {
  const flow: FlowState<T> = {
    type: "flow",
    name: options?.name || `flow-${getIncreaseID()}`,
    initValue,
    comparator: options?.comparator,
  };
  return flow;
}

export function computedFlow<T>(
  computation: ComputationWithInitial<T>,
  options?: ComputationWithInitOptions<T>,
): ComputationFlowStateWithInit<T>;
export function computedFlow<T>(
  computation: ComputationWithoutInitial<T>,
  options?: ComputationWithoutInitOptions<T>,
): ComputationFlowStateWithoutInit<T>;
export function computedFlow<T>(
  computation: ComputationFlowContext<T>,
  options?: ComputationOptions<T>,
): ComputationFlowState<T> {
  if (options && "initValue" in options) {
    const computed: ComputationFlowStateWithInit<T> = {
      type: "computed",
      initValue: options?.initValue,
      computation,
      name: options?.name || `computed-${getIncreaseID()}`,
      comparator: options?.comparator,
    };
    return computed;
  }

  const computed = {
    type: "computed",
    computation,
    name: `computed-${getIncreaseID()}`,
  } as ComputationFlowStateWithoutInit<T>;

  return computed;
}

export function defineProxyFlowState<T, A, V>(options: ProxyFlowOptions<T, A, V>) {
  const proxy: ProxyFlowState<T, A, V> = {
    type: "proxy",
    get: options.get,
    set: options.set,
    name: options?.name || `proxy-${getIncreaseID()}`,
    comparator: options?.comparator,
  };
  return proxy;
}

export function withMatcher<AC extends () => AnyAction>(actionCreator: AC): ActionMatchable<AC>;
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(
  actionCreator: AC,
): ActionMatchable<AC>;
export function withMatcher<AC extends (...args: any[]) => AnyAction>(
  actionCreator: AC,
  type: ReturnType<AC>["type"],
): ActionMatchable<AC>;
export function withMatcher(actionCreator: Function & { type?: string }, _type?: string) {
  const type = _type ?? actionCreator.type ?? actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}
