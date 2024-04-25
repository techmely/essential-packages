import type { Records } from "@techmely/types";
import { isEmpty } from "@techmely/utils";
import { Result } from "../../utils";
import { IResult } from "../../utils/result/types";
import type { BaseEntityProps, CreateEntityProps, EntityConfig, EntityPort } from "./types";
import { UniqueEntityID } from "./unique-entity";

const BASE_MAX_PROPS = 32;
const defaultEntityConfig: EntityConfig = { maxProps: BASE_MAX_PROPS, debug: false };

export abstract class Entity<Props> implements EntityPort<Props> {
  #id: UniqueEntityID;
  readonly #createdAt: Date;
  #updatedAt: Date;
  readonly #props: Props;
  readonly #config: EntityConfig;

  constructor(
    { id, props, createdAt, updatedAt }: CreateEntityProps<Props>,
    config?: EntityConfig,
  ) {
    Entity.isValidProps(props, config);
    this.#id = id;
    const now = new Date();
    this.#createdAt = createdAt || now;
    this.#updatedAt = updatedAt || now;
    this.#props = props;
    this.#config = config || defaultEntityConfig;
    this.validateBusinessRules();
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  static isValidProps(
    props: unknown,
    config: EntityConfig = defaultEntityConfig,
  ): [boolean, Error | undefined] {
    if (isEmpty(props)) {
      if (config.debug) console.error("Entity props should not be empty");
      return [false, Error("Entity props should not be empty")];
    }
    if (typeof props !== "object") {
      if (config.debug) console.error("Entity props should be and object");
      return [false, Error("Entity props should be and object")];
    }
    if (Object.keys(props as any).length >= config.maxProps) {
      const errMessage = `The entity props count must smaller than ${config.maxProps} properties`;
      if (config.debug) console.error(errMessage);
      return [false, Error(errMessage)];
    }
    return [true, undefined];
  }

  get id(): UniqueEntityID {
    return this.#id;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }

  getProps(): Props & BaseEntityProps {
    const clone = {
      id: this.id,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      ...this.#props,
    };
    return Object.freeze(clone);
  }

  /**
   * @description Get hash to identify the entity.
   * @example
   * `[Entity@ClassName]:UUID`
   */
  hashCode(): UniqueEntityID {
    const instance = Reflect.getPrototypeOf(this);
    return new UniqueEntityID(`[Entity@${instance?.constructor?.name}]:${this.#id}`);
  }

  /**
   * @description Get a new instanced based on current Entity.
   * @summary if not provide an id a new one will be generated.
   * @param props as optional Entity Props.
   * @returns new Entity instance.
   */
  clone(props?: Partial<Props>): this {
    const _props = props ? { ...this.#props, ...props } : this.#props;
    const instance = Reflect.getPrototypeOf(this);
    if (!instance) throw new Error("Cannot get prototype of this entity instance");
    const entity = Reflect.construct(instance.constructor, [_props, this.#config]);
    return entity;
  }

  /**
   * Convert an Entity and all sub-entities/Value Objects it
   * contains to a plain object with primitive types. Can be
   * useful when logging an entity during testing/debugging
   */
  toObject(): Records {
    const clone = this.#convertPropsToObject(this.getProps());

    const result = {
      id: this.id,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      ...clone,
    };
    return Object.freeze(result);
  }

  #convertPropsToObject(props: Props & BaseEntityProps) {
    const propsCopy = structuredClone(props) as any;
    for (const prop in propsCopy) {
      const item = propsCopy[prop];
      if (Array.isArray(item)) {
        propsCopy[prop] = item.map((i) => {
          return Entity.isEntity(i) ? i.toObject() : i;
        });
      }
      propsCopy[prop] = Entity.isEntity(item) ? item.toObject() : item;
    }

    return propsCopy;
  }

  abstract validateBusinessRules(): boolean;
}
