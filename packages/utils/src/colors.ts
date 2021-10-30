import { hexColor } from './regex';

export function isHex(hex: string): boolean {
  return hexColor.test(hex);
}
