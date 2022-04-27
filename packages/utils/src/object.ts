import { isObject, isArray, isNotNull, isDef, isNotEmpty, isUndef } from './is';
import { DeepMerge } from './types';

/**
 * @description Deep merge Object
 * This will mutate the old object, be careful
 * {@link https://github.com/antfu/utils/blob/1e66c6f940/src/object.ts#L75#L102}
 * @template T, S
 * @param {T} target - The target object
 * @param {...S[]} sources - The sources will merge
 * @returns {DeepMerge<T, S>} the object after merge
 */
export function deepMerge<
  T extends Record<string, any>,
  S extends Record<string, any>
>(target: T, ...sources: S[]): DeepMerge<T, S> {
  if (sources.length === 0) return target as any;

  const source = sources.shift();
  if (source === undefined) return target as any;

  if (isMergeableObject(target) && isMergeableObject(source)) {
    Object.keys(source).forEach(key => {
      if (isMergeableObject(source[key])) {
        // @ts-expect-error I do not know how to fix this
        // eslint-disable-next-line no-param-reassign
        if (!target[key]) target[key] = {};

        deepMerge(target[key], source[key]);
      } else {
        // @ts-expect-error I do not know how to fix this
        // eslint-disable-next-line no-param-reassign
        target[key] = source[key];
      }
    });
  }

  return deepMerge(target, ...sources);
}

/**
 * @param {any} item - the input check
 * @returns {boolean} - value
 */
function isMergeableObject(item: any): item is Record<string, any> {
  return isObject(item) && !isArray(item);
}

/**
 * @description Remove empty fields from an object. This will mutates the object
 * @param {any} obj - The input obj
 * @returns {any} - the clean obj
 */
export function removeEmptyObj(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, v]) => isNotNull(v) && isDef(v) && isNotEmpty(v)
    )
  );
}

/**
 * @description Remove undefined fields from an object - This will mutates the object
 * @param {any} obj - The input obj
 * @returns {any} - the clean obj
 */
export function removeUndefObj<T extends Record<string, any>>(obj: T): T {
  // eslint-disable-next-line no-param-reassign
  Object.keys(obj).forEach((key: string) =>
    isUndef(obj[key]) ? delete obj[key] : {}
  );
  return obj;
}

/**
 * Map key/value pairs for an object, and construct a new one
 *
 *
 * @category Object
 *
 * Transform:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => [k.toString().toUpperCase(), v.toString()])
 * // { A: '1', B: '2' }
 * ```
 *
 * Swap key/value:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => [v, k])
 * // { 1: 'a', 2: 'b' }
 * ```
 *
 * Filter keys:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => k === 'a' ? undefined : [k, v])
 * // { b: 2 }
 * ```
 */
export function objectMap<K extends string, V, NK = K, NV = V>(
  obj: Record<K, V>,
  fn: (key: K, value: V) => [NK, NV] | undefined
): Record<K, V> {
  // @ts-expect-error ignore type check
  return Object.fromEntries(
    // @ts-expect-error ignore type check
    Object.entries(obj)
      .map(([k, v]) => fn(k as K, v as V))
      .filter(isNotNull)
  );
}

/**
 * Type guard for any key, `k`.
 * Marks `k` as a key of `T` if `k` is in `obj`.
 *
 * @category Object
 * @param obj object to query for key `k`
 * @param k key to check existence in `obj`
 */
export function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T {
  return k in obj;
}

/**
 * Strict typed `Object.keys`
 *
 * @category Object
 */
export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * Strict typed `Object.entries`
 *
 * @category Object
 */
export function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

/**
 * Determines whether an object has a property with the specified name
 *
 * @see https://eslint.org/docs/rules/no-prototype-builtins
 * @category Object
 */
export function hasOwnProperty<T>(obj: T, v: PropertyKey) {
  if (obj === null) return false;
  return Object.prototype.hasOwnProperty.call(obj, v);
}

/**
 * Create a new subset object by giving keys
 *
 * @category Object
 */
export function objectPick<O, T extends keyof O>(
  obj: O,
  keys: T[],
  omitUndefined = false
) {
  return keys.reduce((n, k) => {
    if (k in obj) {
      if (!omitUndefined || obj[k] !== undefined) n[k] = obj[k];
    }
    return n;
  }, {} as Pick<O, T>);
}
