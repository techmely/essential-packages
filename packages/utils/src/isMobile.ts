function match() {
  return typeof window !== "undefined" ? window.matchMedia || window.msMatchMedia : undefined;
}

export function isMobile() {
  return typeof window !== "undefined" ? match()?.("(pointer:coarse)")?.matches : false;
}

declare global {
  interface Window {
    msMatchMedia(query: string): MediaQueryList;
  }
}
