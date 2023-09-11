// Heavy inspire from https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/src/entities/models.ts

import type { Comparer, Dict, EntityId, PreventAny } from "@techmely/types";

export type IdSelector<T> = (model: T) => EntityId;

export type Update<T> = { id: EntityId; changes: Partial<T> };

export interface EntityState<T> {
  ids: EntityId[];
  entities: Dict<T>;
}

export interface EntityDefinition<T> {
  selectId: IdSelector<T>;
  sortComparer: false | Comparer<T>;
}

export interface EntityStateAdapter<T> {
  addOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: T): S;

  addMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: readonly T[] | Record<EntityId, T>,
  ): S;

  setOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: T): S;

  setMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: readonly T[] | Record<EntityId, T>,
  ): S;

  setAll<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: readonly T[] | Record<EntityId, T>,
  ): S;

  removeOne<S extends EntityState<T>>(state: PreventAny<S, T>, key: EntityId): S;

  removeMany<S extends EntityState<T>>(state: PreventAny<S, T>, keys: readonly EntityId[]): S;

  removeAll<S extends EntityState<T>>(state: PreventAny<S, T>): S;

  updateOne<S extends EntityState<T>>(state: PreventAny<S, T>, update: Update<T>): S;

  updateMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    updates: ReadonlyArray<Update<T>>,
  ): S;

  upsertOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: T): S;

  upsertMany<S extends EntityState<T>>(
    state: PreventAny<S, T>,
    entities: readonly T[] | Record<EntityId, T>,
  ): S;
}

export interface EntitySelectors<T, V> {
  selectIds: (state: V) => EntityId[];
  selectEntities: (state: V) => Dict<T>;
  selectAll: (state: V) => T[];
  selectTotal: (state: V) => number;
  selectById: (state: V, id: EntityId) => T | undefined;
}

export interface EntityAdapter<T> extends EntityStateAdapter<T> {
  selectId: IdSelector<T>;
  sortComparer: false | Comparer<T>;
  getInitialState(): EntityState<T>;
  getInitialState<S extends object>(state: S): EntityState<T> & S;
  getSelectors(): EntitySelectors<T, EntityState<T>>;
  getSelectors<V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V>;
}
