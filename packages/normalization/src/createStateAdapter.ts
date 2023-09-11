import type { Comparer } from "@techmely/types";
import { createSelectorsFactory } from "./selectorsFactory";
import { createSortedStateAdapter, createStateAdapter } from "./stateAdapter";
import { createStateFactory } from "./stateFactory";
import type { EntityAdapter, EntityDefinition, IdSelector } from "./types";

export function createEntityAdapter<T>(
  options: {
    selectId?: IdSelector<T>;
    sortComparer?: false | Comparer<T>;
  } = {},
): EntityAdapter<T> {
  const { selectId, sortComparer }: EntityDefinition<T> = {
    sortComparer: false,
    selectId: (instance: any) => instance.id,
    ...options,
  };

  const stateFactory = createStateFactory<T>();
  const selectorsFactory = createSelectorsFactory<T>();
  const stateAdapter = sortComparer
    ? createSortedStateAdapter(selectId, sortComparer)
    : createStateAdapter(selectId);

  return {
    selectId,
    sortComparer,
    ...stateFactory,
    // ...selectorsFactory,
    // ...stateAdapter,
  };
}
