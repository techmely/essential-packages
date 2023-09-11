import { toBoolean } from "./convert";
import { envs, nodeENV } from "./env";
import { platform } from "./process";

export function isNotNull<T>(v: T | null): v is Exclude<T, null> {
  return v !== null;
}

export function isArray<T = unknown>(val: any): val is T[] {
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
export const isFunction = (val: any): boolean => typeof val === "function";
export const isNumber = (val: any): val is number => toString.call(val) === "[object Number]";
export const isString = (val: unknown): val is string => typeof val === "string";
export const isObject = (val: any): val is object => toString.call(val) === "[object Object]";
export const isMap = (val: unknown): val is Map<any, any> => toString.call(val) === "[object Map]";
export const isSet = (val: unknown): val is Set<any> => toString.call(val) === "[object Set]";
export const isDate = (val: unknown): val is Date => toString.call(val) === "[object Date]";
export const isSymbol = (val: unknown): val is symbol => typeof val === "symbol";
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  // @ts-expect-error Ignore type checking
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const isFalsy = (val: any): val is false | undefined | null =>
  isNotNull(val) && isDef(val) && isNotEmpty(val);

export const isStream = (val: any) =>
  val !== null && typeof val === "object" && typeof val.pipe === "function";

// Using `typeof window !== 'undefined'` alone is not enough because some users use https://www.npmjs.com/package/ssr-window
export const isBrowser = typeof window !== "undefined";

type EmptyArray<T> = readonly [T, ...ReadonlyArray<T>];

const isEmptyArr = <T>(array: ReadonlyArray<T> | undefined): array is EmptyArray<T> =>
  array?.length === 0;

/**
 * Check a value is empty or not
 * Currently not support check WeakMap/WeakSet/WeakRef
 */
export function isEmpty<T = unknown>(val: T): boolean {
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

export function isNotEmpty<T = unknown>(val: T): boolean {
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

export const isBase64 = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

export const isAndroid = isBrowser ? /(android)/i.test(navigator.userAgent) : false;

// @ts-expect-error Ignore type check
const match = isBrowser ? window.matchMedia || window.msMatchMedia : undefined;

export const isMobile = isBrowser ? match?.("(pointer:coarse)")?.matches : false;

// Crawl from https://github.com/johannschopplich/unlazy/blob/main/packages/core/src/utils/index.ts#LL4C1-L4C122
export const isCrawler =
  isBrowser &&
  (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

export const isCI = toBoolean(envs.CI);

/** Detect if `NODE_ENV` environment variable is `test` */
export const isNodeTest = nodeENV === "test" || toBoolean(envs.TEST);

/** Detect if `NODE_ENV` environment variable is `production` */
export const isNodeProd = nodeENV === "production";

/** Detect if `NODE_ENV` environment variable is `dev` or `development` */
export const isNodeDev = nodeENV === "dev" || nodeENV === "development";

/** Detect if process.platform is Windows */
export const isWindows = /^win/i.test(platform);

/** Detect if process.platform is Linux */
export const isLinux = /^linux/i.test(platform);

/** Detect if process.platform is macOS (darwin kernel) */
export const isMacOS = /^darwin/i.test(platform);
