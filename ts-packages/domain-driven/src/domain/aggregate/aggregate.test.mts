import { describe, expect, it, vi } from "vitest";
import { Aggregate } from ".";
import { Result } from "../../utils";
import type { CreateEntityProps } from "../entity/types";
import type { AggregateConfig } from "./types";

describe("Aggregate", () => {
  describe("Aggregate basic", () => {
    type Props = {
      id: string;
      name: string;
    };
    class AggregateErr extends Aggregate<Props> {
      override validateBusinessRules(): boolean {
        return true;
      }
      static create(props: CreateEntityProps<Props>, config: AggregateConfig) {
        const [isValid, error] = AggregateErr.isValidProps(props);
        if (!isValid) return Result.fail(error);
        const aggregate = new AggregateErr(props, config);
        return Result.Ok(aggregate);
      }
    }
    it("Should return fails if you provide a null value", () => {
      // @ts-expect-error Intentionally config
      const instance = AggregateErr.create(null, null);
      expect(instance.isFail()).toBeTruthy();
    });
    // it("Should generate exactly hash-code");
    // it("Should have a context");
    // it("Should get a valid aggregate metrics");
    // it("Should clone another instance");
  });
  // describe("Aggregate with value object");
  // describe("Aggregate with updated/created at");
  // describe("Aggregate with domain id");
  // describe("Aggregate events", () => {
  //   it("Should dispatch the specified event");
  //   it("Should add event");
  //   it("Should remove event");
  //   it("Should dispatch all events");
  //   it("Should clear all events");
  // });
  // describe("Aggregate to object");
});
