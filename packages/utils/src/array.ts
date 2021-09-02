/**
 * Unique an Array
 *
 * @category Array
 */
export function unique<T>(array: readonly T[]): T[] {
  return [...new Set(array)];
}

/**
 * Creates a slice of array with n elements taken from the beginning.
 * @param array
 * @param limit
 * @category Array
 */
export function take<T>(array: readonly T[], limit: number): T[] {
  return array.slice(0, limit);
}
