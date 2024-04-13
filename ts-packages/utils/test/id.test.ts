import { describe, expect, it } from "vitest";
import { generateId, generatePrefixId } from "../src/id";

describe("Test generate ID", () => {
  it("Should generate id with default options", () => {
    expect(generateId()).toHaveLength(21);
  });
  it("Should generate id with the specific length options", () => {
    expect(generateId(20)).toHaveLength(20);
  });
  it("Should generate id with the prefix", () => {
    const id = generatePrefixId();
    expect(id).toHaveLength(26);
  });
  it("Should generate id with the prefix + options", () => {
    const id = generatePrefixId("user", 16);
    expect(id).toHaveLength(21);
  });
});
