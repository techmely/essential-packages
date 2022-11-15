/**
 * @description Take only unique value from an array
 * @template T
 * @param {T[]} array - The input array
 * @returns {T[]} - New array with unique value
 */
export function unique<T>(array: readonly T[]): T[] {
	return [...new Set(array)];
}

/**
 * @description Creates a slice of array with n elements taken from the beginning.
 * @template T
 * @param {T[]} array - The input array
 * @param {number} limit - The number you want to
 * @returns {T[]} - New array was sliced
 */
export function take<T>(array: readonly T[], limit: number): T[] {
	return array.slice(0, limit);
}

/**
 * Returns the index of the last element in the array where predicate is true, and -1
 * otherwise.
 * @param array The source array to search in
 * @param predicate find calls predicate once for each element of the array, in descending
 * order, until it finds one where predicate returns true. If such an element is found,
 * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
 */
export function findLastIndex<T>(
	array: T[],
	predicate: (value: T, index: number, obj: T[]) => boolean,
): number {
	let l = array.length;
	while (l--) {
		if (predicate(array[l], l, array)) {
			return l;
		}
	}
	return -1;
}

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
export function chunk<T>(array: readonly T[], size = 1) {
	if (!array || array.length === 0) {
		return [];
	}

	const chunkLength = Math.ceil(array.length / size);

	return Array.from({ length: chunkLength }, (_v, i) => {
		const start = i * size;
		return array.slice(start, start + size);
	});
}
