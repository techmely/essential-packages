import './src/node';
import './src/sources';

// Global compile-time constants
declare const __DEV__: boolean;
declare const __PRODUCTION__: boolean;
declare const __TEST__: boolean;

declare interface Dict<T> {
  [key: string]: T;
}

declare type Nullable<T> = T | null;
declare type Undefinable<T> = T | undefined;
declare type NullList<T> = T | undefined | null;

declare interface Headers extends Dict<string> {}
