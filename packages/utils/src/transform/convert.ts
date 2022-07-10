import type { ComputeRange } from '@techmely/types';

/**
 * Transform an integer into its hexadecimal value
 *
 * @param {number | bigint} integer the input value
 * @returns {string} the hexadecimal value after convert
 */
export function intToHex(integer: number | bigint): string {
  if (integer < 0) {
    throw new Error('Invalid integer as argument, must be unsigned!');
  }
  const hex = integer.toString(16);
  return hex.length % 2 ? `0${hex}` : hex;
}

/**
 * Transform an integer into a Buffer
 *
 * @param {number | bigint} integer the input value
 * @returns {Buffer} the buffer after convert
 */
export function intToBuffer(integer: number | bigint): Buffer {
  const hex = intToHex(integer);
  return Buffer.from(hex, 'hex');
}

/**
 * Transform an integer into a hex --> The opacity
 *
 * @param {number} percent the input value
 * @returns {string} The hex decimal
 */
export function percentToHex(
  percent: ComputeRange<MAXIMUM_ALLOWED_BOUNDARY>[number]
): string {
  if (percent < 0 || percent > 100) {
    throw new Error('Value must in range [0, 100]');
  }

  const intValue = Math.round((percent / 100) * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
}

const HEX_LENGTH = 6;
const HEX_OPACITY_LENGTH = 8;

export function alphaHex(
  hex: string,
  alpha: ComputeRange<MAXIMUM_ALLOWED_BOUNDARY>[number]
) {
  if (!hex) {
    throw new Error('Hex value is required');
  }
  if (hex.length === HEX_OPACITY_LENGTH) {
    return `${hex.slice(0, HEX_LENGTH)}${percentToHex(alpha)}`;
  }
  return `${hex}${percentToHex(alpha)}`;
}

type MAXIMUM_ALLOWED_BOUNDARY = 101;
