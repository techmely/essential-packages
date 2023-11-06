import type { Accessor, Setter } from "solid-js";
import type { MarkRequired } from "ts-essentials";

export type FlowStateType = "flow" | "computed" | "proxy";
export type Lazy<T> = T | (() => T);
export type Parameter<T> = T extends (arg: infer U) => any ? U : never;
export type Comparator<T> = false | ((pre: T, next: T) => boolean);

export type FlowStateOptions<T> = {
  name?: string;
  comparator?: Comparator<T>;
};

export interface FlowState<T> extends MarkRequired<FlowStateOptions<T>, "name"> {
  type: FlowStateType;
  initValue: Lazy<T>;
}

/**
 * Computed
 */

export interface FlowStateContext {
  get<T>(state: FlowState<T>): T;
  get<T>(state: ComputationFlowState<T>): T;
  get<T, A, R>(state: ProxyFlowState<T, A, R>): T;

  set<T>(state: FlowState<T>, value: Parameter<Setter<T>>): void;
  set<T, A, R>(state: ProxyFlowState<T, A, R>, action: A): R;
}

export type ComputationWithInitial<T> = (context: FlowStateContext, prev: T) => T;
export type ComputationWithoutInitial<T> = (context: FlowStateContext, prev?: T) => T;
export type ComputationFlowContext<T> = ComputationWithInitial<T> | ComputationWithoutInitial<T>;
export type ComputedFlow<T> = ComputationFlowStateWithInit<T> | ComputationFlowStateWithoutInit<T>;

export type ComputationWithInitOptions<T> = FlowStateOptions<T> & { initValue: Lazy<T> };
export type ComputationWithoutInitOptions<T> = FlowStateOptions<T>;
export type ComputationOptions<T> =
  | ComputationWithInitOptions<T>
  | ComputationWithoutInitOptions<T>;

export interface ComputationFlowStateWithoutInit<T> extends FlowState<T> {
  type: "computed";
  computation: ComputationWithoutInitial<T>;
}

export interface ComputationFlowStateWithInit<T> extends FlowState<T> {
  type: "computed";
  computation: ComputationWithInitial<T>;
}

export type ComputationFlowState<T> =
  | ComputationFlowStateWithoutInit<T>
  | ComputationFlowStateWithInit<T>;

/**
 * PROXY
 */
export type ProxySignal<T, A, V> = [Accessor<T>, (action: A) => V];

interface ProxyGetSet<T, A, V> {
  get: (context: FlowStateContext) => T;
  set: (context: FlowStateContext, action: A) => V;
}
export interface ProxyFlowState<T, A, V> extends ProxyGetSet<T, A, V> {
  name: string;
  type: FlowStateType;
  comparator?: Comparator<T>;
}
export interface ProxyFlowOptions<T, A, V> extends FlowStateOptions<T>, ProxyGetSet<T, A, V> {}

export type FlowGetSetState<T, A, V> = FlowState<T> | ComputedFlow<T> | ProxyFlowState<T, A, V>;

export type AnyAction<T extends string = string> = {
  type: T;
  [key: string]: any;
};

export type ActionMatchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};
