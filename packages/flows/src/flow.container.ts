import { type Accessor, Setter, type Signal, createMemo, createSignal } from "solid-js";
import type {
  ComputationFlowState,
  ComputationFlowStateWithInit,
  ComputedFlow,
  FlowGetSetState,
  FlowState,
  FlowStateContext,
  Parameter,
  ProxyFlowState,
  ProxySignal,
} from "./flow.types";
import { unwrapLazyFn } from "./flow.utils";

function isGenericWithoutInit<T>(v: any): v is T {
  return "initValue" in v;
}

export class FlowContainer<T = any> implements FlowStateContext {
  #flows = new Map<string, Signal<T>>();
  #computeds = new Map<string, Accessor<T>>();
  #proxies = new Map<string, ProxySignal<T, any, any>>();

  getFlowState(flow: FlowState<T>): Signal<T> {
    const instance = this.#flows.get(flow.name);
    if (instance) return instance;
    const signal = createSignal(unwrapLazyFn(flow.initValue), flow);
    this.#flows.set(flow.name, signal);
    return signal;
  }

  getComputed(computed: ComputedFlow<T>): Accessor<T> {
    const instance = this.#computeds.get(computed.name);
    if (instance) return instance;
    const memoComputed = createMemo(
      (pre: any) => computed.computation(this, pre),
      isGenericWithoutInit<ComputationFlowStateWithInit<T>>(computed)
        ? unwrapLazyFn(computed.initValue)
        : undefined,
      computed,
    );

    this.#computeds.set(computed.name, memoComputed);
    return memoComputed;
  }

  getProxy<A, V>(proxy: ProxyFlowState<T, A, V>): ProxySignal<T, A, V> {
    const instance = this.#proxies.get(proxy.name);
    if (instance) return instance;
    const signal: ProxySignal<T, A, V> = [
      createMemo(() => proxy.get(this), undefined, proxy),
      (action: A): V => proxy.set(this, action),
    ];
    this.#proxies.set(proxy.name, signal);
    return signal;
  }

  get(flow: FlowState<T>): T;
  get(computed: ComputationFlowState<T>): T;
  get<A, V>(proxy: ProxyFlowState<T, A, V>): T;
  get<A, V>(state: FlowGetSetState<T, A, V>): T {
    switch (state.type) {
      case "flow":
        return this.getFlowState(state as FlowState<T>)[0]();
      case "computed":
        return this.getComputed(state as ComputationFlowState<T>)[0]();
      case "proxy":
        return this.getProxy(state as ProxyFlowState<T, A, V>)[0]();
      default:
        throw new Error("Unknown flow's type");
    }
  }
  set(state: FlowState<T>, value: Parameter<Setter<T>>): T;
  set<A, V>(state: ProxyFlowState<T, A, V>, action: A): V;
  set<A, V>(state: FlowGetSetState<T, A, V>, action: Parameter<Setter<T>> | A): T | V {
    switch (state.type) {
      case "flow":
        return this.getFlowState(state as FlowState<T>)[1](action as Parameter<Setter<T>>);
      case "proxy":
        return this.getProxy(state as ProxyFlowState<T, A, V>)[1](action as A);

      default:
        throw new Error("Unknown flow's type");
    }
  }
}
