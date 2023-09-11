import { cacheStringFunction } from "./cache";

const camelizeRE = /-(\w)/g;
export const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, "-$1").toLowerCase(),
);

export const snake2camel = cacheStringFunction((str: string) => {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
});

export const camel2snake = cacheStringFunction((str: string) => {
  return str.replace(/[A-Z0-9]/g, (char) => `_${char.toLocaleLowerCase()}`);
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
export function getRandomString(length: number, alphanumeric?: "a" | "n"): string {
  let str = "";
  let i = 0;
  const min = alphanumeric === "a" ? 10 : 0;
  const max = alphanumeric === "n" ? 10 : 62;

  while (i++ < length) {
    let r = Math.trunc(Math.random() * (max - min) + min);
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    str += String.fromCodePoint((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
  }
  return str;
}

/**
 *
 * * * *
 * Example:
 * ```typescript
 * import { cutString } from "@techmely/utils";
 *
 * const str = 'foolvkl';
 *
 * cutString(str, 3); // 'foo'
 * ```
 */
export function cutString(value: string, limit: number): string | undefined {
  if (!value && typeof value !== "string") return undefined;
  if (value.length === 0) return value;
  return value.split("").slice(0, limit).join("");
}
