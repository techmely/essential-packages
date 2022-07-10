export function snake2camel(src: string) {
  return src.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

export function capitalizeFirst(value: string) {
  return value.replace(/^./, value[0].toUpperCase());
}

/**
 * Transform an integer into a hex --> The opacity
 *
 * @param {number} percent the input value
 * @returns {string} The hex decimal
 */
export function percentToHex(percent: number): string {
  if (percent < 0 || percent > 100) {
    throw new Error('Value must in range [0, 100]');
  }

  const intValue = Math.round((percent / 100) * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
}
