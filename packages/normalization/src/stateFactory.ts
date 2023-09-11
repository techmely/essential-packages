import type { EntityState } from "./types";

export function getInitialEntityState<T>(): EntityState<T> {
  return {
    ids: [],
    entities: {},
  };
}

export function createStateFactory<V>() {
  function getInitialState(): EntityState<V>;
  function getInitialState<S extends object>(additionalState: S): EntityState<V> & S;
  function getInitialState(additionalState: unknown = {}): unknown {
    return Object.assign(getInitialEntityState(), additionalState);
  }

  return { getInitialState };
}
