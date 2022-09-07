export type Nullable<T> = T | null;
export type UnDef<T> = T | undefined;
export type NullList<T> = T | undefined | null;

export interface DictionaryNum<T> {
  [id: number]: UnDef<T>;
}
export interface Dictionary<T> extends DictionaryNum<T> {
  [id: string]: UnDef<T>;
}

export type VoidFunc<T> = (value: T) => void;
