export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function calculateSum(...args: number[] | number[][]) {
  return [...args].flat(1).reduce((a, b) => a + b, 0);
}
