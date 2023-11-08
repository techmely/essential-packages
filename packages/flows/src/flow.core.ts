import { batch, untrack } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";
import type {
  AnyFunc,
  AnyFuncRecords,
  FactoryFlowStore,
  FlowActions,
  FlowStore,
  FlowStorePlugin,
} from "./flow.types";

/**
 * Identify function creating an action - function for mutating the state.
 * Actions are `batch`ed and `untrack`ed by default - no need to wrap them in `batch` and `untrack`.
 * @param fn the function to wrap
 * @returns function of the same signature as `fn` but wrapped in `batch` and `untrack`
 */
export function createAction<T extends AnyFunc>(fn: T): T {
  return ((...args) => batch(() => untrack(() => fn(...args)))) as T;
}

/**
 * wraps each function in `actions` with `createAction` to improve performance and prevent unnecessary
 * re-renders and returns a new object of the same type
 * @param actions a collection of `Action` functions to wrap
 * @returns a new object of the same type but each function is wrapped with `createAction`
 */
export function createActions<T extends AnyFuncRecords>(functions: T): FlowActions<T> {
  const actions: Record<string, AnyFunc> = { ...functions };
  for (const [name, fn] of Object.entries(functions)) {
    actions[name] = createAction(fn);
  }
  return actions as any;
}

/**
 * Create a Solid 'Store' by specifying a state type and/or provide an `initState`

* @example
 * ```tsx
 * export const counterFlowStore = defineFlowStore({
 *   value: 5,
 * }, {
 *  getters: state => ({
 *   count: () => state.value,
 *  }),
 *  actions: (setState, state) => ({
 *   increment: () => setState(val => ({ ...val, value: val.value + 1 })),
 *   reset: () => setState("value", 0),
 *  })
 * });
 *
 *
 *
 * const {state: counterState, getters: {count}, actions: {increment, reset}} = counterFlowStore;
 * count() // => 5
 * increment()
 * count() // => 6
 * reset() // => 0
 * ```
 */
export function defineFlowStore<
  S extends Record<string, unknown>,
  A extends AnyFuncRecords,
  // biome-ignore lint/complexity/noBannedTypes: Typescript
  G extends AnyFuncRecords = {},
>(
  initValue: S,
  methods: {
    actions: (setStore: SetStoreFunction<S>, s: S) => A;
    getter?: (s: S) => G;
    plugins?: FlowStorePlugin<S, A, G>[];
  },
): FlowStore<S, A, G> {
  const [state, setState] = createStore(initValue);

  return {
    state,
    getters: methods?.getter ? methods.getter(state) : ({} as G),
    actions: createActions(methods.actions(setState, state)),
    plugins: methods?.plugins || [],
    _p: [],
  };
}

/**
 * Create a `FluxStore` encapsulated in a `FluxFactory` function.
 * The factory function accepts `initialValueOverride?: T | ((fallbackState: T) => T)` to optionally
 * override the initial state of the store while creating each new instance.
 * @example
 * ```tsx
 * export const counterFactory = defineFactoryFlowStore({
 *   value: 5,
 * }, {
 *  getters: state => ({
 *   count: () => state.value,
 *  }),
 *  actions: (setState, state) => ({
 *   increment: () => setState(val => ({ ...val, value: val.value + 1 })),
 *   reset: () => setState("value", 0),
 *  })
 * });
 *
 *
 * const {state: counterState, getters: {count}, actions: {increment, reset}} = defineFactoryFlowStore({ value: 25 });
 * const {getters: {count: pageViews}, actions: {increment: newPageView, reset: resetPageViews}} = defineFactoryFlowStore({ value: 0 });
 * count() // => 25
 * pageViews() // => 0
 * increment()
 * newPageView()
 * count() // => 26
 * pageViews() // => 1
 * reset() // => 0
 * newPageView()
 * pageViews() // => 2
 * resetPageViews() // => 0
 * ```
 */
export function defineFactoryFlowStore<
  S extends Record<string, unknown>,
  A extends AnyFuncRecords,
  // biome-ignore lint/complexity/noBannedTypes: Typescript
  G extends AnyFuncRecords = {},
>(
  fallbackState: S,
  methods: {
    actions: (setStore: SetStoreFunction<S>, s: S) => A;
    getter?: (s: S) => G;
    plugins?: FlowStorePlugin<S, A, G>[];
  },
): FactoryFlowStore<S, A, G> {
  return (initValueOverride) =>
    defineFlowStore(
      initValueOverride
        ? typeof initValueOverride === "function"
          ? untrack(() => initValueOverride({ ...fallbackState }))
          : { ...initValueOverride }
        : { ...fallbackState },
      methods,
    );
}
