/**
 * Transform an integer into its hexadecimal value
 *
 * @param {number | bigint} integer the input value
 * @returns {string} the hexadecimal value after convert
 */
export function intToHex(integer: number | bigint): string {
  if (integer < 0) {
    throw new Error("Invalid integer as argument, must be unsigned!");
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
  return Buffer.from(hex, "hex");
}

export function toBoolean(val: boolean | string | undefined) {
  return val ? val !== "false" : false;
}

export type ResponseTime = {
  seconds: number;
  milliseconds: number;
  nanoseconds: number | bigint;
};

export function convertHrTime(hrtime: bigint): ResponseTime {
  const nanoseconds = hrtime;
  const number = Number(nanoseconds);
  const milliseconds = number / 1e6;
  const seconds = number / 1e9;

  return {
    seconds,
    milliseconds,
    nanoseconds,
  };
}
