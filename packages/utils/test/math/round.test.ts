import {
  halfAwayFromZero,
  halfDown,
  halfEven,
  halfOdd,
  halfTowardsZero,
  halfUp,
  roundDown,
  roundUp,
} from '../../src';

describe('Round Math', () => {
  describe('up', () => {
    it('rounds up with a positive float below half', () => {
      expect(roundUp(1.4)).toBe(2);
    });
    it('rounds up with a negative float below half', () => {
      expect(roundUp(-1.4)).toBe(-1);
    });
    it('rounds up with a positive half float', () => {
      expect(roundUp(1.5)).toBe(2);
    });
    it('rounds up with a negative half float', () => {
      expect(roundUp(-1.5)).toBe(-1);
    });
    it('rounds up with a positive float above half', () => {
      expect(roundUp(1.6)).toBe(2);
    });
    it('rounds up with a negative float above half', () => {
      expect(roundUp(-1.6)).toBe(-1);
    });
  });

  describe('round down', () => {
    it('rounds down with a positive float below half', () => {
      expect(roundDown(1.4)).toBe(1);
    });
    it('rounds down with a negative float below half', () => {
      expect(roundDown(-1.4)).toBe(-2);
    });
    it('rounds down with a positive half float', () => {
      expect(roundDown(1.5)).toBe(1);
    });
    it('rounds down with a negative half float', () => {
      expect(roundDown(-1.5)).toBe(-2);
    });
    it('rounds down with a positive float above half', () => {
      expect(roundDown(1.6)).toBe(1);
    });
    it('rounds down with a negative float above half', () => {
      expect(roundDown(-1.6)).toBe(-2);
    });
  });

  describe('halfAwayFromZero', () => {
    it('rounds down with a positive float below half', () => {
      expect(halfAwayFromZero(1.4)).toBe(1);
    });
    it('rounds up with a negative float below half', () => {
      expect(halfAwayFromZero(-1.4)).toBe(-1);
    });
    it('rounds to the nearest integer away from zero with a positive half float', () => {
      expect(halfAwayFromZero(1.5)).toBe(2);
    });
    it('rounds to the nearest integer away from zero with a negative half float', () => {
      expect(halfAwayFromZero(-2.5)).toBe(-3);
    });
    it('rounds up with a positive float above half', () => {
      expect(halfAwayFromZero(1.6)).toBe(2);
    });
    it('rounds down with a negative float above half', () => {
      expect(halfAwayFromZero(-1.6)).toBe(-2);
    });
  });

  describe('halfDown', () => {
    it('rounds down with a positive float below half', () => {
      expect(halfDown(1.4)).toBe(1);
    });
    it('rounds down with a negative float below half', () => {
      expect(halfDown(-1.4)).toBe(-1);
    });
    it('rounds down with a positive half float', () => {
      expect(halfDown(1.5)).toBe(1);
    });
    it('rounds down with a negative half float', () => {
      expect(halfDown(-1.5)).toBe(-2);
    });
    it('rounds up with a positive float above half', () => {
      expect(halfDown(1.6)).toBe(2);
    });
    it('rounds down with a negative float above half', () => {
      expect(halfDown(-1.6)).toBe(-2);
    });
  });

  describe('halfEven', () => {
    it('rounds down with a positive float below half', () => {
      expect(halfEven(1.4)).toBe(1);
    });
    it('rounds down with a negative float below half', () => {
      expect(halfEven(-1.4)).toBe(-1);
    });
    it('rounds to nearest even integer with a positive half float rounding to an even integer', () => {
      expect(halfEven(1.5)).toBe(2);
    });
    it('rounds to nearest even integer with a positive half float rounding to an odd integer', () => {
      expect(halfEven(2.5)).toBe(2);
    });
    it('rounds to nearest even integer with a negative half float', () => {
      expect(halfEven(-2.5)).toBe(-2);
    });
    it('rounds up with a positive float above half', () => {
      expect(halfEven(1.6)).toBe(2);
    });
    it('rounds down with a negative float above half', () => {
      expect(halfEven(-1.6)).toBe(-2);
    });
  });

  describe('halfOdd', () => {
    it('rounds down with a positive float below half', () => {
      expect(halfOdd(1.4)).toBe(1);
    });
    it('rounds down with a negative float below half', () => {
      expect(halfOdd(-1.4)).toBe(-1);
    });
    it('rounds to nearest odd integer with a positive half float rounding to an even integer', () => {
      expect(halfOdd(1.5)).toBe(1);
    });
    it('rounds to nearest odd integer with a positive half float rounding to an odd integer', () => {
      expect(halfOdd(2.5)).toBe(3);
    });
    it('rounds to nearest odd integer with a negative half float', () => {
      expect(halfOdd(-2.5)).toBe(-3);
    });
    it('rounds up with a positive float above half', () => {
      expect(halfOdd(1.6)).toBe(2);
    });
    it('rounds down with a negative float above half', () => {
      expect(halfOdd(-1.6)).toBe(-2);
    });
  });

  describe('halfTowardsZero', () => {
    it('rounds down with a positive float below half', () => {
      expect(halfTowardsZero(1.4)).toBe(1);
    });
    it('rounds up with a negative float below half', () => {
      expect(halfTowardsZero(-1.4)).toBe(-1);
    });
    it('rounds to the nearest integer towards zero with a positive half float', () => {
      expect(halfTowardsZero(1.5)).toBe(1);
    });
    it('rounds to the nearest integer towards zero with a negative half float', () => {
      expect(halfTowardsZero(-2.5)).toBe(-2);
    });
    it('rounds up with a positive float above half', () => {
      expect(halfTowardsZero(1.6)).toBe(2);
    });
    it('rounds down with a negative float above half', () => {
      expect(halfTowardsZero(-1.6)).toBe(-2);
    });
  });

  describe('halfUp', () => {
    it('rounds down with a positive float below half', () => {
      expect(halfUp(1.4)).toBe(1);
    });
    it('rounds down with a negative float below half', () => {
      expect(halfUp(-1.4)).toBe(-1);
    });
    it('rounds up with a positive half float', () => {
      expect(halfUp(1.5)).toBe(2);
    });
    it('rounds up with a negative half float', () => {
      expect(halfUp(-2.5)).toBe(-2);
    });
    it('rounds up with a positive float above half', () => {
      expect(halfUp(1.6)).toBe(2);
    });
    it('rounds down with a negative float above half', () => {
      expect(halfUp(-1.6)).toBe(-2);
    });
  });
});
