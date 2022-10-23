export function isNotNull<T>(v: T | null): v is Exclude<T, null> {
	return v !== null;
}

export function isArray(val: any): val is any[] {
	return val && Array.isArray(val);
}

export function isPrimitive(value: unknown): boolean {
	if (value === null) {
		return true;
	}

	return !["array", "function", "object"].includes(typeof value);
}

export const isDef = <T = any>(val?: T): val is T => typeof val !== "undefined";
export const isUndef = <T = any>(val?: T): val is T => !isDef(val);
export const isBoolean = (val: any): val is boolean => typeof val === "boolean";
export const isFunction = <T extends Function>(val: any): val is T => typeof val === "function";
export const isNumber = (val: any): val is number => typeof val === "number";
export const isString = (val: unknown): val is string => typeof val === "string";
export const isObject = (val: any): val is object => toString.call(val) === "[object Object]";

export const isFalsy = (val: any): val is false | undefined | null =>
	isNotNull(val) && isDef(val) && isNotEmpty(val);

export const isWindow = (val: any): boolean =>
	typeof window !== "undefined" && toString.call(val) === "[object Window]";

// Using `typeof window !== 'undefined'` alone is not enough because some users use https://www.npmjs.com/package/ssr-window
export const isBrowser = typeof window !== "undefined";

type EmptyArray<T> = readonly [T, ...ReadonlyArray<T>];

const isEmptyArr = <T>(array: ReadonlyArray<T> | undefined): array is EmptyArray<T> =>
	array?.length === 0;

export function isEmpty<T = unknown>(val: T): val is T {
	if (!val) {
		return true;
	}
	if (isArray(val)) {
		return isEmptyArr(val);
	}

	if (isString(val)) {
		return val.trim().length === 0;
	}

	if (val instanceof Map || val instanceof Set) {
		return val.size === 0;
	}

	if (isObject(val)) {
		return Object.keys(val).length === 0;
	}

	return false;
}

export function isNotEmpty<T = unknown>(val: T): val is T {
	return !isEmpty(val);
}

/**
 * Use for case you validate multiple values is not empty
 *
 * @param {any} args any arguments
 * @returns {boolean} will return true if all value is not empty
 */
export function isNotEmpties(...args: any[]): boolean {
	if (args.length > 1) {
		return args.reduce((a, b) => a && isNotEmpty(b), true);
	}
	return false;
}

/**
 * Use for case you validate multiple values is not empty
 * @param args
 */
export function isEmpties(...args: any[]): boolean {
	if (args.length > 1) {
		return args.reduce((a, b) => a && isEmpty(b), true);
	}
	return false;
}

/**
 * {@link} https://en.wikipedia.org/wiki/Portable_Network_Graphics
 *
 * @param {Buffer | Uint8Array} buffer Input is a buffer
 * @returns {boolean} return true if the input is a PNG Image
 */
export function isPngImage(buffer: Buffer | Uint8Array): boolean {
	if (!buffer || buffer.length < 8) {
		return false;
	}

	return (
		buffer[0] === 0x89 &&
		buffer[1] === 0x50 &&
		buffer[2] === 0x4e &&
		buffer[3] === 0x47 &&
		buffer[4] === 0x0d &&
		buffer[5] === 0x0a &&
		buffer[6] === 0x1a &&
		buffer[7] === 0x0a
	);
}
