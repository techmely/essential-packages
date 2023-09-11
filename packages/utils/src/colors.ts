import type { ComputeRange } from "@techmely/types";
import { hexColor } from "./regex";

export function isHex(hex: string): boolean {
  return hexColor.test(hex);
}

/**
 * Transform an integer into a hex --> The opacity
 *
 * @param {number} percent the input value
 * @returns {string} The hex decimal
 */
export function percentToHex(percent: ComputeRange<MAXIMUM_ALLOWED_BOUNDARY>[number]): string {
  if (percent < 0 || percent > 100) {
    throw new Error("Value must in range [0, 100]");
  }

  const intValue = Math.round((percent / 100) * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return hexValue.padStart(2, "0").toUpperCase(); // format with leading 0 and upper case characters
}

const HEX_LENGTH = 6;
const HEX_OPACITY_LENGTH = 8;

export function alphaHex(hex: string, alpha: ComputeRange<MAXIMUM_ALLOWED_BOUNDARY>[number]) {
  if (!hex) {
    throw new Error("Hex value is required");
  }
  if (hex.length === HEX_OPACITY_LENGTH) {
    return `${hex.slice(0, HEX_LENGTH)}${percentToHex(alpha)}`;
  }
  return `${hex}${percentToHex(alpha)}`;
}

type MAXIMUM_ALLOWED_BOUNDARY = 101;
