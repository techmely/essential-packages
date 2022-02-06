import { isArray, isString, isObject } from './isType';

type EmptyArray<T> = readonly [T, ...ReadonlyArray<T>];
const isEmptyArr = <T>(
  array: ReadonlyArray<T> | undefined
): array is EmptyArray<T> => !!array && array.length === 0;

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
