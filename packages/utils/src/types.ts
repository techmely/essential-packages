export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type NullList<T> = T | undefined | null;

export type MergeInsertions<T> = T extends Record<string, any>
  ? { [K in keyof T]: MergeInsertions<T[K]> }
  : T;

export type DeepMerge<F, S> = MergeInsertions<
  {
    [K in keyof F | keyof S]: K extends keyof S & keyof F
      ? DeepMerge<F[K], S[K]>
      : K extends keyof S
      ? S[K]
      : K extends keyof F
      ? F[K]
      : never;
  }
>;
