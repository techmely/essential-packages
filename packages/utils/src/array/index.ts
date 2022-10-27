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
