import type { Tree } from "@techmely/types";

/**
 * Type alias for any function with any number of arguments and any return type.
 */
export type AnyFunc = (...args: any[]) => any;
export type AnyFuncRecords = { readonly [K in string]: AnyFunc };

/**
 * type alias for an object with string keys and `Action` function values
 * @returns a generic set of `Action` functions
 */
export type FlowActions<T extends AnyFuncRecords> = { readonly [K in keyof T]: T[K] };

/**
 * Interface to be extended by the user when they add properties through plugins.
 */

// biome-ignore lint/suspicious/noEmptyInterface: Ignore
export interface FlowCustomProperties<
  Id extends string = string,
  S extends Tree = Tree,
  G = _GettersTree<S>,
  A = _ActionsTree,
> {}

/**
 * Properties that are added to every `store.$state` by `flow.use()`.
 */

// biome-ignore lint/suspicious/noEmptyInterface: Ignore
export interface FlowCustomStateProperties<S extends Tree = Tree> {}

export type FlowStore<
  S extends Record<string, unknown>,
  A extends AnyFuncRecords,
  // biome-ignore lint/complexity/noBannedTypes: Typescript
  G extends AnyFuncRecords = {},
> = {
  state: S;
  getters: G;
  actions: FlowActions<A>;
  plugins: FlowStorePlugin<S, A, G>[];
  _p: FlowStorePlugin<S, A, G>[];
};

export type FactoryFlowStore<
  S extends Record<string, unknown>,
  A extends AnyFuncRecords,
  // biome-ignore lint/complexity/noBannedTypes: Typescript
  G extends AnyFuncRecords = {},
> = (initValue?: S | ((fallback: S) => S)) => FlowStore<S, A, G>;

export interface FlowPluginContext<
  S extends Record<string, unknown>,
  A extends AnyFuncRecords,
  // biome-ignore lint/complexity/noBannedTypes: Typescript
  G extends AnyFuncRecords = {},
> {
  flow: FlowStore<S, A, G>;
}
export interface FlowStorePlugin<
  S extends Record<string, unknown>,
  A extends AnyFuncRecords,
  // biome-ignore lint/complexity/noBannedTypes: Typescript
  G extends AnyFuncRecords = {},
> {
  (context: FlowPluginContext<S, A, G>):
    | Partial<FlowCustomProperties & FlowCustomStateProperties>
    | (() => void);
}

export type _GettersTree<S extends Tree> = Record<
  string,
  ((state: FlowCustomStateProperties<S>) => any) | (() => any)
>;

/**
 * Type of an object of Actions. For internal usage only.
 * For internal use **only**
 */
export type _ActionsTree = Record<string, (...args: any[]) => any>;

export type AnyAction<T extends string = string> = {
  type: T;
  [key: string]: any;
};

export type ActionMatchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};
