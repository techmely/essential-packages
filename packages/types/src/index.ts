export * from './combination';
export * from './package';

export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type NullList<T> = T | undefined | null;

export interface DictionaryNum<T> {
  [id: number]: Undefinable<T>;
}
export interface Dictionary<T> extends DictionaryNum<T> {
  [id: string]: Undefinable<T>;
}

export type VoidFunc<T> = (value: T) => void;
