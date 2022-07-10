import { take, unique } from '@techmely/utils';
import { describe, expect, it } from 'vitest';

describe('Array utils test', () => {
  describe('Unique array', () => {
    it('Should return array without any duplicate element', () => {
      expect(unique([10, 10, 20, 30, 30, 40])).toEqual([10, 20, 30, 40]);
    });
  });

  describe('Take array', () => {
    it('Should return new array without slice', () => {
      expect(take([10, 10, 20, 30, 30, 40], 2)).toEqual([10, 10]);
      expect(take([10, 10, 20, 30, 30, 40], 4)).toEqual([10, 10, 20, 30]);
    });
  });
});
