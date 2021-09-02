import { deepMerge } from '../packages/utils/src';

describe('Object test', () => {
  describe('deepMerge', () => {
    it('should merge Objects and all nested Ones', () => {
      const obj1 = { a: { a1: 'A1' }, c: 'C', d: {} };
      const obj2 = { a: { a2: 'A2' }, b: { b1: 'B1' }, d: null } as any;
      const obj3 = { a: { a1: 'A1', a2: 'A2' }, b: { b1: 'B1' }, c: 'C', d: null };
      expect(deepMerge({}, obj1, obj2)).toEqual(obj3);
    });
    it('should behave like Object.assign on the top level', () => {
      const obj1 = { a: { a1: 'A1' }, c: 'C' };
      const obj2 = { a: undefined, b: { b1: 'B1' } };
      const merged = deepMerge(obj1, obj2);
      expect(merged).toEqual({ ...obj1, ...obj2 });
    });
    it('should not merge array values, just override', () => {
      const obj1 = { a: ['A', 'B'] };
      const obj2 = { a: ['C'], b: ['D'] };
      expect(deepMerge({}, obj1, obj2)).toEqual({ a: ['C'], b: ['D'] });
    });
  });
});
