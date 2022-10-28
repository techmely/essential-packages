const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null);
  return ((str: string) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }) as T;
};

const camelizeRE = /-(\w)/g;
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, "-$1").toLowerCase()
);

export const snake2camel = cacheStringFunction((src: string) => {
  return src.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
});

export const capitalizeFirst = cacheStringFunction((value: string) => {
  return value.replace(/^./, value[0].toUpperCase());
});

/**
 * @param text string will slugify for only Latin/Vietnamese
 * @returns {string}
 */
export function slugify(text: string): string {
  if (!text) {
    return "";
  }
  return text
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[Đđ]/g, "d") // Replace-all the đ char with d
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

/**
 * Pseudo-random string generator
 * http://stackoverflow.com/a/27872144/383904
 * Default: return a random alpha-numeric string
 *
 * @param {Integer} length Desired length
 * @param {String} alphanumeric Optional (alphanumeric), "a" (alpha), "n" (numeric)
 * @return {String}
 */
export function getRandomString(
  length: number,
  alphanumeric?: "a" | "n"
): string {
  let str = "";
  let i = 0;
  const min = alphanumeric === "a" ? 10 : 0;
  const max = alphanumeric === "n" ? 10 : 62;

  while (i++ < length) {
    let r = Math.trunc(Math.random() * (max - min) + min);
    str += String.fromCodePoint((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
  }
  return str;
}

function getTag(value) {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return toString.call(value);
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * isString('abc')
 * // => true
 *
 * isString(1)
 * // => false
 */
export function isString(value) {
  const type = typeof value;
  return (
    type === "string" ||
    (type === "object" &&
      value != null &&
      !Array.isArray(value) &&
      getTag(value) == "[object String]")
  );
}

export default isString;
