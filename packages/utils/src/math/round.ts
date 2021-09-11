/**
 * Round a number down.
 *
 * @param {number} value - The number to round.
 * @returns {number} The rounded number.
 */
export const roundDown = (value: number): number => Math.floor(value);

/**
 * Round a number up.
 *
 * @param {number} value - The number to round.
 * @returns {number} The rounded number.
 */
export const roundUp = (value: number): number => Math.ceil(value);

/**
 * Round a number with half values to nearest integer farthest from zero.
 *
 * @param {number} value - The number to round.
 * @returns {number} The rounded number.
 */
export const halfAwayFromZero = (value: number): number =>
  isHalf(value) ? Math.sign(value) * Math.ceil(Math.abs(value)) : Math.round(value);

/**
 * Round a number with half values down.
 *
 * @param {number} value - The number to round.
 * @returns {number} The rounded number.
 */
export const halfDown = (value: number): number =>
  isHalf(value) ? Math.floor(value) : Math.round(value);

/**
 * Round a number with half values up.
 *
 * @param {number} value - The number to round.
 * @returns {number} The rounded number.
 */
export const halfUp = (value: number): number => Math.round(value);

/**
 * Round a number with half values to nearest even integer.
 *
 * @param {number} value - The number to round.
 * @returns {number} The rounded number.
 */
export const halfEven = (value: number): number => {
  const rounded = Math.round(value);

  if (!isHalf(value)) {
    return rounded;
  }

  return isEven(rounded) ? rounded : rounded - 1;
};

/**
 * Round a number with half values to nearest odd integer.
 *
 * @param {number} value - The number to round.
 * @returns {number} The rounded number.
 */
export const halfOdd = (value: number): number => {
  const rounded = Math.round(value);

  if (!isHalf(value)) {
    return rounded;
  }

  return isEven(rounded) ? rounded - 1 : rounded;
};

/**
 * Round a number with half values to nearest integer closest to zero.
 *
 * @param {number} value - The number to round.
 * @returns {number} The rounded number.
 */
export const halfTowardsZero = (value: number): number =>
  isHalf(value) ? Math.sign(value) * Math.floor(Math.abs(value)) : Math.round(value);

/**
 * Return whether a number is half.
 *
 * @param {number} value - The number to test.
 * @returns {boolean} Whether the number is half.
 */
function isHalf(value: number): boolean {
  return Math.abs(value) % 1 === 0.5;
}

/**
 * Return whether a number is even.
 *
 * @param {number} value - The number to test.
 * @returns {boolean} Whether the number is even.
 */
export function isEven(value: number): boolean {
  return value % 2 === 0;
}
