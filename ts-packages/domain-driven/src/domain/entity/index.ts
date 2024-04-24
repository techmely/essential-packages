import type { Records } from "@techmely/types";
import type { EntityPort } from "./types";
import type { UniqueEntityID } from "./unique-entity";

export class Entity<Props> implements EntityPort<Props> {
  get id(): UniqueEntityID {
    throw new Error("Method not implemented.");
  }
  hashCode(): UniqueEntityID {
    throw new Error("Method not implemented.");
  }
  clone(): EntityPort<Props> {
    throw new Error("Method not implemented.");
  }
  toObject(): Records {
    throw new Error("Method not implemented.");
  }
}
