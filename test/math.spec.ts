import { calculateSum } from '../packages/utils/src/math';

it('Calculate sum', () => {
  expect(calculateSum(1, 2, 3)).toEqual(6);
  expect(calculateSum([1, 2, 3])).toEqual(6);
  expect(calculateSum([1], [2, 3])).toEqual(6);

  // @ts-expect-error Bcs the type of args can be number [][]
  expect(calculateSum(1, 2, [1, 2, 3])).toEqual(9);
});
