import type { EntityId, NullList, UnDef } from "@techmely/types";
import { isNumber } from "./is";
/**
 *
 * @param num
 * @param precision
 * @param defaultValue
 * @returns
 */
export function formatNumber(
  num: NullList<EntityId>,
  precision = 0,
  defaultValue: UnDef<EntityId> = "-",
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
 * @param volume
 * @param precision
 * @param defaultValue
 * @returns
 */
export function formatLot10Volume(
  volume: NullList<EntityId>,
  precision = 0,
  defaultValue: UnDef<EntityId> = "-",
) {
  if (!isNumber(volume)) {
    return defaultValue;
  }
  return (volume * 10)?.toLocaleString("en", { minimumFractionDigits: precision }).slice(0, -1);
}

/**
 *  Number precision: Correct the given number to specifying significant digits.
 *
 * @param num The input number
 * @param precision An integer specifying the number of significant digits
 *
 * @example strip(0.09999999999999998) === 0.1 // true
 */
export function Strip(num: EntityId, precision = 15): number {
  return +parseFloat(Number(num).toPrecision(precision));
}

/**
 *  Number precision: Return digits length of a number.
 *
 * @param num The input number
 */
export function DigitLength(num: EntityId): number {
  // Get digit length of e
  const eSplit = num.toString().split(/[eE]/);
  const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 *  Number precision: Convert the given number to integer, support scientific notation.
 * The number will be scale up if it is decimal.
 *
 * @param num The input number
 */
export function Float2Fixed(num: EntityId): number {
  if (num.toString().indexOf("e") === -1) {
    return Number(num.toString().replace(".", ""));
  }
  const dLen = DigitLength(num);
  const powDLen = 10 ** dLen;
  return dLen > 0 ? Strip(Number(num) * powDLen) : Number(num);
}

let _boundaryCheckingState = true;

/**
 *  Number precision: Log a warning if the given number is out of bounds.
 *
 * @param num The input number
 */
export function CheckBoundary(num: number) {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(
        `${num} is beyond boundary when transfer to integer, the results may not be accurate`,
      );
    }
  }
}

/**
 * Create an operation to support rest params.
 *
 * @param operation The original operation
 */
function npCreateOperation(
  operation: (n1: EntityId, n2: EntityId) => number,
): (...nums: EntityId[]) => number {
  return (...nums: EntityId[]) => {
    const [first, ...others] = nums;
    return others.reduce((prev, next) => operation(prev, next), first) as number;
  };
}

/**
 * Number precision: Accurate multiplication.
 *
 * @param nums The numbers to multiply
 */
export const Times = npCreateOperation((num1, num2) => {
  const num1Changed = Float2Fixed(num1);
  const num2Changed = Float2Fixed(num2);
  const baseNum = DigitLength(num1) + DigitLength(num2);
  const leftValue = num1Changed * num2Changed;

  CheckBoundary(leftValue);
  const baseNumPow = 10 ** baseNum;
  return leftValue / baseNumPow;
});

/**
 *  Number precision: Accurate addition.
 *
 * @param nums The numbers to add
 */
export const Plus = npCreateOperation((num1, num2) => {
  // take the largest decimal place
  const baseNum = 10 ** Math.max(DigitLength(num1), DigitLength(num2));
  // Convert decimals to integers and calculate
  return (Times(num1, baseNum) + Times(num2, baseNum)) / baseNum;
});

/**
 * Number precision: Accurate subtraction.
 *
 * @param nums The numbers to subtract
 */
export const Minus = npCreateOperation((num1, num2) => {
  const baseNum = 10 ** Math.max(DigitLength(num1), DigitLength(num2));
  return (Times(num1, baseNum) - Times(num2, baseNum)) / baseNum;
});

/**
 * Number precision: Accurate division.
 *
 * @param nums The numbers to divide
 */
export const Divide = npCreateOperation((num1, num2) => {
  const num1Changed = Float2Fixed(num1);
  const num2Changed = Float2Fixed(num2);

  CheckBoundary(num1Changed);
  CheckBoundary(num2Changed);

  // fix: Something like 10 ** -4 is 0.00009999999999999999, strip corrected
  return Times(num1Changed / num2Changed, Strip(10 ** (DigitLength(num2) - DigitLength(num1))));
});

/**
 * Number precision: Accurate rounding method.
 *
 * @param num The number to round
 * @param decimal An integer specifying the decimal digits
 */
export function Round(num: EntityId, decimal: number): number {
  const base = 10 ** decimal;
  let result = Divide(Math.round(Math.abs(Times(num, base))), base);

  if (isNumber(num) && num < 0 && result !== 0) {
    result = Times(result, -1);
  }

  return result;
}

/**
 * Number precision: Whether to check the bounds of number, default is enabled.
 *
 * @param flag The value to indicate whether is enabled
 */
export function EnableBoundaryChecking(flag = true) {
  _boundaryCheckingState = flag;
}
