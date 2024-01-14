export function nextFrame() {
  return new Promise(requestAnimationFrame);
}

export function nextIdle() {
  // @ts-expect-error Ignore
  return new Promise(window.requestIdleCallback || setTimeout);
}

export function transitionEnd(element: HTMLElement) {
  return nextEvent(element, "transitionend");
}

export function nextEvent(element: HTMLElement, eventName: string) {
  return new Promise((resolve) =>
    element.addEventListener(eventName, (event) => resolve(event), { once: true }),
  );
}
