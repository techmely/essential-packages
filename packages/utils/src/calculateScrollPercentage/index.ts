import { invariant } from "../invariant";
import { isServer } from "../isServer";

export function calculateScrollPercentage() {
  invariant(isServer());
  const scrollPosition = window.scrollY || window.scrollY || document.documentElement.scrollTop;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollPosition / totalHeight) * 100;
  return scrollPercentage;
}
