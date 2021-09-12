/**
 *
 * @param {number} n - The input n
 * @param {number} min - The input min
 * @param {number} max - The input max
 * @returns {number} - the clamp number
 */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/**
 * @param {number[] | number[][]} args - The input number
 * @returns {number} - Sum of array
 */
export function sum(...args: number[] | number[][]): number {
  return [...args].flat(1).reduce((a, b) => a + b, 0);
}

/**
 *
 * @param {number} y1 -
 * @param {number} y2 -
 * @param {number} mu -
 * @returns {number} - the lerp
 */
export function lerp(y1: number, y2: number, mu: number): number {
  return y1 * (1 - mu) + y2 * mu;
}
