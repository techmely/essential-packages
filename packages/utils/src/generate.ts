export function getRandomInt(min: number, max: number): number;
/**
 * @description Get random number
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values}
 * @param {number} min - Input min number
 * @param {number} max - Input max number
 * @returns {number} - The random number
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const hexList: string[] = [];
for (let i = 0; i <= 15; i += 1) {
  hexList[i] = i.toString(16);
}

/**
 * @returns {string} - The uuid string
 */
export function uuidV4(): string {
  let uuidResult = '';
  const uuidLength = 36;
  const dashPositionUuid = new Set([9, 14, 19, 24]);

  for (let i = 1; i <= uuidLength; i += 1) {
    if (dashPositionUuid.has(i)) {
      uuidResult += '-';
    } else if (i === 15) {
      uuidResult += 4;
    } else if (i === 20) {
      uuidResult += hexList[(Math.random() * 4) | 8];
    } else {
      uuidResult += hexList[Math.trunc(Math.random() * 16)];
    }
  }
  return uuidResult.replace(/-/g, '');
}

let unique = 0;

/**
 *
 * @param {string} prefix - the prefix you want
 * @returns {string} - The short UUID
 */
export function shortUuidV4(prefix: string = ''): string {
  const time = Date.now();
  const random = Math.floor(Math.random() * 1_000_000_000);
  unique += 1;
  return `${prefix}_${random}${unique}${String(time)}`;
}
