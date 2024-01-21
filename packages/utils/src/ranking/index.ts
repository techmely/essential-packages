import { ranking } from "./ranking.test.mjs";

describe("Check ranking func", () => {
  expect(ranking([8, 6, 9, 5], (a, b) => a < b)).toStrictEqual([2, 3, 1, 4]);

  expect(
    ranking([3, 1, 2, 4], (a, b) => a.toString().localeCompare(b.toString()) > 0),
  ).toStrictEqual([3, 1, 2, 4]);
});
