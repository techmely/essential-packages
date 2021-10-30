import { isHex } from '../src/colors';

describe('Colors utilities', () => {
  describe('Check hex color', () => {
    const validHexColors = ['#2f2f2f', '#010000'];
    const invalidHexColors = ['#checkhex', '#0101'];
    it('Should return boolean value when check element is Hex color', () => {
      validHexColors.forEach(hex => {
        expect(isHex(hex)).toBe(true);
      });

      invalidHexColors.forEach(hex => {
        expect(isHex(hex)).toBe(false);
      });
    });
  });
});
