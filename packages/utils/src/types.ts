import { Undefinable } from '@techmely/types';

export type MergeInsertions<T> = T extends Record<string, any>
  ? { [K in keyof T]: MergeInsertions<T[K]> }
  : T;

export type DeepMerge<F, S> = MergeInsertions<{
  [K in keyof F | keyof S]: K extends keyof S & keyof F
    ? DeepMerge<F[K], S[K]>
    : K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
}>;

export abstract class CookieInstance<T> {
  abstract setSecureToken(token: string, env?: string): void;

  abstract get(name: string): Undefinable<string>;

  abstract getSecureToken(env: string): string;

  abstract getDecodedSecureToken(): T;

  abstract clearSecureToken(env: string): void;
}
