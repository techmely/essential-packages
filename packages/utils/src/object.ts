import type { CamelToSnakeNested, DeepMerge, Tree } from "@techmely/types";
import { isArray, isDef, isNotEmpty, isNotNull, isObject, isUndef } from "./is";
import { camel2snake } from "./string";

/**
 * @description Deep merge Object
 * This will mutate the old object, be careful
 * {@link https://github.com/antfu/utils/blob/1e66c6f940/src/object.ts#L75#L102}
 * @template T, S
 * @param {T} target - The target object
 * @param {...S[]} sources - The sources will merge
 * @returns {DeepMerge<T, S>} the object after merge
 */
export function deepMerge<T extends Record<string, any>, S extends Record<string, any>>(
  target: T,
  ...sources: S[]
): DeepMerge<T, S> {
  if (sources.length === 0) {
    return target as any;
  }

  const source = sources.shift();
  if (source === undefined) {
    return target as any;
  }

  if (isMergeableObject(target) && isMergeableObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isMergeableObject(source[key])) {
        if (!target[key]) {
          // @ts-expect-error I do not know how to fix this
          target[key] = {};
        }

        if (isMergeableObject(target[key])) {
          deepMerge(target[key], source[key]);
        } else {
          // @ts-expect-error I do not know how to fix this
          target[key] = source[key];
        }
      } else {
        // @ts-expect-error I do not know how to fix this
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
    Object.entries(obj).filter(([_, v]) => isNotNull(v) && isDef(v) && isNotEmpty(v)),
  );
}

/**
 * @description Remove undefined fields from an object - This will mutates the object
 * @param {any} obj - The input obj
 * @returns {any} - the clean obj
 */
export function removeUndefObj<T extends Record<string, unknown>>(obj: T): T {
  Object.keys(obj).forEach((key: string) => (isUndef(obj[key]) ? obj[key] === undefined : {}));
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
  fn: (key: K, value: V) => [NK, NV] | undefined,
): Record<K, V> {
  // @ts-expect-error ignore type check
  return Object.fromEntries(
    // @ts-expect-error ignore type check
    Object.entries(obj)
      .map(([k, v]) => fn(k as K, v as V))
      .filter(isNotNull),
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
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export function objectCamel2Snake<T extends Object>(obj: T) {
  return Object.entries(obj).reduce(
    (acc, cur) => ({ ...acc, [camel2snake(cur[0])]: cur[1] }),
    {} as CamelToSnakeNested<T>,
  );
}

/**
 * Pick nested properties from an object with path/multiple paths.
 * Example:
 * - pick({ a: { b: 1 } }, ["a.b"]) => { a: { b: 1 } }
 * - pick({ a: { b: 1 } }, "a") => { a: { b: 1 } }
 */
export function pick(state: Tree, paths: string | string[]): Tree {
  if (Array.isArray(paths)) {
    return paths.reduce<Tree>((acc, path) => {
      const _paths = path.split(".");
      return set(acc, _paths, get(state, _paths));
    }, {});
  }
  return get(state, paths.split("."));
}

function get(state: Tree, paths: string[]) {
  return paths.reduce((acc, path) => acc?.[path], state);
}

/**
 * avoids prototype pollution
 */
const ProtoRE = /^(__proto__)$/;

function set(state: Tree, paths: string[], val: unknown): Tree {
  const last = paths.at(-1);
  if (last === undefined) return state;

  const restPaths = paths.slice(0, -1);
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  const result = restPaths.reduce((obj, p) => (ProtoRE.test(p) ? {} : (obj[p] ||= {})), state);
  result[last] = val;
  return state;
}
