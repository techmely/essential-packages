import { isBrowser } from "./is";

// Shim from https://developers.google.com/web/updates/2015/08/using-requestidlecallback
function requestIdleCallbackShim(cb: any) {
  const start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      },
    });
  }, 1);
}

function cancelIdleCallbackShim(id: any) {
  clearTimeout(id);
}

export const requestIdleCallback = isBrowser
  ? window.requestIdleCallback || requestIdleCallbackShim
  : requestIdleCallbackShim;
export const cancelIdleCallback = isBrowser
  ? window.cancelIdleCallback || cancelIdleCallbackShim
  : cancelIdleCallbackShim;
