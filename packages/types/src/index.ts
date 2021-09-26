export * from './combination';

export interface Dict<T> {
  [key: string]: T;
}

export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type NullList<T> = T | undefined | null;

export interface Headers extends Dict<string> {}
