import type { StringEnum } from "@techmely/types";
import { isBrowser } from "./isBrowser";

export const $ = <K extends keyof HTMLElementTagNameMap>(tag: StringEnum<K>) =>
  isBrowser() ? (document.querySelector.call(this, tag) as HTMLElementTagNameMap[K] | null) : null;
export const $$ = <K extends keyof HTMLElementTagNameMap>(tag: StringEnum<K>) =>
  isBrowser()
    ? (document.querySelectorAll.call(this, tag) as NodeListOf<HTMLElementTagNameMap[K]> | null)
    : null;
