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
export function deepMerge<T extends Record<string, any>, S extends Record<string, any>>(
  target: T,
  ...sources: S[]
): DeepMerge<T, S> {
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
    Object.entries(obj).filter(([_, v]) => isNotNull(v) && isDef(v) && isNotEmpty(v)),
  );
}

/**
 * @description Remove undefined fields from an object - This will mutates the object
 * @param {any} obj - The input obj
 * @returns {any} - the clean obj
 */
export function removeUndefObj<T extends Record<string, any>>(obj: T): T {
  // eslint-disable-next-line no-param-reassign
  Object.keys(obj).forEach((key: string) => (isUndef(obj[key]) ? delete obj[key] : {}));
  return obj;
}
