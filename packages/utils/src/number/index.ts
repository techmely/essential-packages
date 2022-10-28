import { NullList, UnDef } from "@techmely/types";
import { isSymbol } from "../is";

import { isNumber } from "../is";

/**
 *
 * @param num
 * @param precision
 * @param defaultValue
 * @returns
 */
export function formatNumber(
  num: NullList<number | string>,
  precision = 0,
  defaultValue: UnDef<number | string> = "-"
) {
  if (!isNumber(num)) {
    return defaultValue;
  }
  return num.toLocaleString("en", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

/**
 *
 * @param price
 * @param precision
 * @returns
 */
export function formatPrice(
  price: NullList<number | string>,
  precision = 0,
  defaultValue: string | number = "-"
) {
  return formatNumber(price, precision, defaultValue);
}

/**
 *
 * @param volume
 * @param precision
 * @param defaultValue
 * @returns
 */
export function formatLot10Volume(
  volume: NullList<number | string>,
  precision = 0,
  defaultValue: UnDef<number | string> = "-"
) {
  if (!isNumber(volume)) {
    return defaultValue;
  }
  return (volume * 10)
    ?.toLocaleString("en", { minimumFractionDigits: precision })
    .slice(0, -1);
}

export function toNumber(value) {
  if (typeof value === "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    const other = typeof value.valueOf === "function" ? value.valueOf() : value;
    value = isObject(other) ? `${other}` : other;
  }
  if (typeof value !== "string") {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, "");
  const isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value)
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : reIsBadHex.test(value)
    ? NAN
    : +value;
}
