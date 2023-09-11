import { describe, expect, test } from "vitest";
import { isArray, isEmpty, isNotEmpties } from "../src";

describe.concurrent("Test valid is", () => {
  test("Should return true", () => {
    expect(isNotEmpties("test", "test")).toEqual(true);
    expect(isNotEmpties("test", "test", "test")).toEqual(true);
  });
  test("Should return false when check is Empty", () => {
    expect(isEmpty("test")).toEqual(false);
    expect(isEmpty("   ")).toEqual(true);
  });

  test("Should return false", () => {
    expect(isNotEmpties("", "test")).toEqual(false);
    expect(isNotEmpties("", "")).toEqual(false);
    expect(isNotEmpties("test", "")).toEqual(false);
    expect(isNotEmpties("", "", "", "")).toEqual(false);
    expect(isNotEmpties("", "test", "", "")).toEqual(false);
    expect(isNotEmpties("", "", "", "test")).toEqual(false);
  });

  test("Should is an array", () => {
    expect(isArray([])).toEqual(true);
    expect(isArray([1, 2, 3])).toEqual(true);
    expect(isArray([1, 2, 3, "test"])).toEqual(true);
    expect(isArray([1, 2, 3, "test", {}])).toEqual(true);
    expect(isArray({})).toEqual(false);
  });
});
