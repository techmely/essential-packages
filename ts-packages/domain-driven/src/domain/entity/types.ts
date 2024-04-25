import type { Records } from "@techmely/types";
import type { MarkOptional } from "ts-essentials";
import type { UniqueEntityID } from "./unique-entity";

export interface BaseEntityProps {
  id: UniqueEntityID;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T>
  extends MarkOptional<BaseEntityProps, "createdAt" | "updatedAt"> {
  props: T;
}

export type EntityConfig = {
  maxProps: number;
  debug: boolean;
};

export interface EntityPort<Props> {
  get id(): UniqueEntityID;
  /**
   * @description Get hash to identify the entity.
   * @example
   * `[Entity@ClassName]:UUID`
   */
  hashCode(): UniqueEntityID;
  /**
   * @description Get a new instanced based on current Entity.
   */
  clone(): EntityPort<Props>;
  /**
   * @description Get value as object from entity.
   */
  toObject(): Records;
}
