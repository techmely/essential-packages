// <reference types="node" />
declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
  }
}

declare module '@techmely/types' {
  let __DEV__: boolean;
  let __PRODUCTION__: boolean;
  let __TEST__: boolean;

  let __COMMIT__: string;
  let __VERSION__: string;

  type Dict<T> = {
    [key: string]: T;
  };
  type Nullable<T> = T | null;
  type Undefinable<T> = T | undefined;
  type NullList<T> = T | undefined | null;
}
