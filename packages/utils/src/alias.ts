import type { StringEnum } from "@techmely/types";
import { isBrowser } from "./isBrowser";

export const $ = <K extends keyof HTMLElementTagNameMap>(tag: StringEnum<K>) =>
  isBrowser() ? (document.querySelector.call(this, tag) as HTMLElementTagNameMap[K] | null) : null;
export const $$ = <K extends keyof HTMLElementTagNameMap>(tag: StringEnum<K>) =>
  isBrowser()
    ? (document.querySelectorAll.call(this, tag) as NodeListOf<HTMLElementTagNameMap[K]> | null)
    : null;

HTMLElement.prototype.on = (a, b, c) =>
  // @ts-expect-error Ignore typing check
  isBrowser() ? (this as unknown as HTMLElement)?.addEventListener(a, b, c) : null;
HTMLElement.prototype.of = (a, b, c) =>
  // @ts-expect-error Ignore typing check
  isBrowser() ? (this as unknown as HTMLElement)?.removeEventListener(a, b, c) : null;
HTMLElement.prototype.$ = (s) =>
  isBrowser() ? (this as unknown as HTMLElement)?.querySelector(s) : null;
HTMLElement.prototype.$$ = (s) =>
  isBrowser() ? (this as unknown as HTMLElement)?.querySelectorAll(s) : null;

declare global {
  interface GlobalEventHandlers {
    on<K extends keyof GlobalEventHandlersEventMap>(
      type: StringEnum<K>,
      listener: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ): void;
    of<K extends keyof GlobalEventHandlersEventMap>(
      type: StringEnum<K>,
      listener: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions,
    ): void;
    $<K extends keyof HTMLElementTagNameMap>(
      selector: StringEnum<K>,
    ): HTMLElementTagNameMap[K] | null;
    $$<K extends keyof HTMLElementTagNameMap>(
      selector: StringEnum<K>,
    ): NodeListOf<HTMLElementTagNameMap[K]> | null;
  }
}
