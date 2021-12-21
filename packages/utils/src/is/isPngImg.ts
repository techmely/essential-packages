/**
 * {@link} https://en.wikipedia.org/wiki/Portable_Network_Graphics
 *
 * @param {Buffer | Uint8Array} buffer Input is a buffer
 * @returns {boolean} return true if the input is a PNG Image
 */
export function isPngImage(buffer: Buffer | Uint8Array) {
  if (!buffer || buffer.length < 8) {
    return false;
  }

  // prettier-ignore
  return (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4E &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0D &&
    buffer[5] === 0x0A &&
    buffer[6] === 0x1A &&
    buffer[7] === 0x0A
  );
}
