import { describe, expect, it } from "vitest";
import { deepMerge, objectCamel2Snake, pick } from "../src/object";

describe("Object test", () => {
  describe("deepMerge", () => {
    it("should merge Objects and all nested Ones", () => {
      const obj1 = { a: { a1: "A1" }, c: "C", d: {} };
      const obj2 = { a: { a2: "A2" }, b: { b1: "B1" }, d: null } as any;
      const obj3 = {
        a: { a1: "A1", a2: "A2" },
        b: { b1: "B1" },
        c: "C",
        d: null,
      };
      expect(deepMerge({}, obj1, obj2)).toEqual(obj3);
    });
    it("should behave like Object.assign on the top level", () => {
      const obj1 = { a: { a1: "A1" }, c: "C" };
      const obj2 = { a: undefined, b: { b1: "B1" } };
      const merged = deepMerge(obj1, obj2);
      expect(merged).toEqual({ ...obj1, ...obj2 });
    });
    it("should not merge array values, just override", () => {
      const obj1 = { a: ["A", "B"] };
      const obj2 = { a: ["C"], b: ["D"] };
      expect(deepMerge({}, obj1, obj2)).toEqual({ a: ["C"], b: ["D"] });
    });
    it("should override plain value", () => {
      const obj1 = { a: { x: 1 } };
      const obj2 = { a: { x: { f: 2 } } } as any;
      expect(deepMerge({}, obj1, obj2)).toEqual({ a: { x: { f: 2 } } });
    });
  });
  describe("Camel case object to snake case object", () => {
    it("Should transform correctly", () => {
      const obj1 = { abc: 1, helloWorld: "ok", nani1: "LOL", ohmy11God: "ohmy11God" };
      const obj2 = { abc: 1, hello_world: "ok", nani_1: "LOL", ohmy_1_1_god: "ohmy11God" };
      const result = objectCamel2Snake(obj1);
      expect(result).toEqual(obj2);
    });
  });
});

describe("Pick", () => {
  const data = [
    // pick single path
    [
      {
        ignored: "fake",
        outer1: { inner1: "mock", inner2: "mock2", inner3: "mock3" },
        outer2: "outer",
      },
      "outer1.inner1",
      "mock",
    ],
    [
      {
        outer1: {
          inner1: "mock",
          nested: {
            nested1: {
              nested2: "nested2",
            },
          },
        },
      },
      "outer1.nested.nested1.nested2",
      "nested2",
    ],
    [
      {
        ignored: "fake",
        outer1: { inner1: "mock", inner2: "mock2", inner3: "mock3" },
        outer2: "outer",
      },
      "not.defined.yet",
      undefined,
    ],

    /// pick multiple paths
    [{ name: "John", age: 30 }, [], {}],
    [
      {},
      ["name", "age"],
      {
        name: undefined,
        age: undefined,
      },
    ],
    [{ name: "John", age: 30, city: "New York" }, ["name", "age"], { name: "John", age: 30 }],
    [
      { name: "John", age: 30 },
      ["city", "occupation", "age"],
      {
        city: undefined,
        occupation: undefined,
        age: 30,
      },
    ],
    // picks nested properties
    [
      {
        ignored: "fake",
        outer1: { inner1: "mock", inner2: "mock2", inner3: "mock3" },
        outer2: "outer",
      },
      ["outer1.inner1", "outer1.inner2", "outer2"],
      {
        outer1: { inner1: "mock", inner2: "mock2" },
        outer2: "outer",
      },
    ],
    [
      {
        outer1: { inner1: "mock", inner2: "mock2", inner3: "mock3" },
        outer2: { nested1: { nested2: "nested2" } },
      },
      ["outer1.inner1", "outer1.inner2", "outer2.nested1", "outer2.nested1.nested2"],
      {
        outer1: { inner1: "mock", inner2: "mock2" },
        outer2: { nested1: { nested2: "nested2" } },
      },
    ],
    // avoids prototype pollution
    [{ date: new Date() }, ["date.__proto__.constructor"], { date: {} }],
    // creates paths for undefined values
    [{ ignore: "mock" }, ["not.defined.yet"], { not: { defined: { yet: undefined } } }],
  ];

  // @ts-expect-error Ignore type checks
  it.concurrent.each(data)("picks object with %s", (object, paths, expected) => {
    // @ts-expect-error Ignore type checks
    expect(pick(object, paths)).toStrictEqual(expected);
  });
});
