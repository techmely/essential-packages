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
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */

export function groupBy<K, V>(list: V[], keyGetter: (input: V) => K): Map<K, V[]> {
	const map = new Map<K, V[]>();
	list.forEach((item) => {
		const key = keyGetter(item);
		const collection = map.get(key);
		if (collection) {
			collection.push(item);
		} else {
			map.set(key, [item]);
		}
	});
	return map;
}

export const remove = <T>(arr: T[], el: T) => {
	const i = arr.indexOf(el);
	if (i > -1) {
		arr.splice(i, 1);
	}
};

/**
 * Get random items from an array
 */
export function sample<T>(arr: T[], count: number) {
	return Array.from({ length: count }, (_) => arr[Math.round(Math.random() * (arr.length - 1))]);
}

/**
 * Shuffle an array. This function mutates the array.
 */
export function shuffle<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const factor = Math.floor(Math.random() * (i + 1));
		[array[i], array[factor]] = [array[factor], array[i]];
	}
	return array;
}

/**
 * A specialized version of `forEach` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
export function arrayEach(array, iteratee) {
	let index = -1;
	const length = array.length;

	while (++index < length) {
		if (iteratee(array[index], index, array) === false) {
			break;
		}
	}
	return array;
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
