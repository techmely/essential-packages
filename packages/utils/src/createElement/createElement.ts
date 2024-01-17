import type { StringEnum } from "@techmely/types";

type Child = string | Node | null | undefined | readonly Child[];

/**
 * Create an element with flexible way
 * @param tag
 * @param attrs | children --> Can be Record<string|number> or children[]
 */
export function createElement(
  tag: StringEnum<keyof HTMLElementTagNameMap> | HTMLElement,
  ...children: any[]
): HTMLElement {
  if (typeof window === "undefined") throw new Error("Not in browser environment");

  let element = tag;
  if (typeof element === "string") element = document.createElement(element);
  let i = 1;
  const next = arguments[1];
  if (next && typeof next === "object" && !(next as Node).nodeType && !Array.isArray(next)) {
    for (const name in next) {
      const value = next?.[name];
      if (typeof value === "string") element.setAttribute(name, value);
      if (value) element[name] = value;
    }
    i++;
  }
  for (; i < arguments.length; i++) add(element, arguments[i]);

  return element;
}

function add(element: HTMLElement, child: Child) {
  if (!child) return;

  if (typeof child === "string") {
    element.appendChild(document.createTextNode(child));
  } else if ((child as Node).nodeType !== null) {
    element.appendChild(child as Node);
  } else if (Array.isArray(child)) {
    for (const c of child) {
      add(element, c as Child);
    }
  }
}
