import { isServer } from "../isServer";

/**
 * Runs the callback whenever the user has stopped scrolling.
 * @param {CallableFunction} callback
 */
export function onScrollStop(callback: CallableFunction, timeout = 150) {
  if (isServer()) return;
  let isScrolling: number | NodeJS.Timeout;
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        callback();
      }, timeout);
    },
    false,
  );
}
