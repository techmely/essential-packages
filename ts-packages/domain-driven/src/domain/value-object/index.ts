import { isEmpty } from "@techmely/utils";
import type {
  DomainPrimitive,
  Primitives,
  ValueObjectOptions,
  ValueObjectPort,
  ValueObjectProps,
} from "./types";

export class ValueObject<Props> implements ValueObjectPort<Props> {
  #props: ValueObjectProps<Props>;
  #options: ValueObjectOptions;

  constructor(props: ValueObjectProps<Props>, options?: ValueObjectOptions) {
    const _options = options || { parser: JSON };
    this.#validateProps(props);
    this.#props = props;
    this.#options = _options;
  }

  static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  clone(props?: Partial<ValueObjectProps<Props>>): this {
    const _props = props ? { ...this.#props, ...props } : this.#props;
    const instance = Reflect.getPrototypeOf(this);
    if (!instance) throw new Error("Cannot get prototype of this entity instance");
    const vo = Reflect.construct(instance.constructor, [_props]);
    return vo;
  }

  isEqual(vo?: this): boolean {
    if (!vo) return false;
    return this.#options.parser.stringify(this) === this.#options.parser.stringify(vo);
  }

  /**
   * Convert value obj to get raw properties
   */
  raw() {
    if (this.#isDomainPrimitive(this.#props)) {
      return this.#props.value;
    }
    const clone = this.#convertPropsToObject(this.#props);
    return Object.freeze(clone);
  }

  #convertPropsToObject(props: ValueObjectProps<Props>) {
    const propsCopy = structuredClone(props) as any;
    for (const prop in propsCopy) {
      const item = propsCopy[prop];
      if (Array.isArray(item)) {
        propsCopy[prop] = item.map((i) => {
          return ValueObject.isValueObject(i) ? i.raw() : i;
        });
      }
      propsCopy[prop] = ValueObject.isValueObject(item) ? item.raw() : item;
    }

    return propsCopy;
  }

  #validateProps(props: unknown) {
    if (isEmpty(props) || (this.#isDomainPrimitive(props) && isEmpty(props.value))) {
      throw new Error("Props cannot be empty");
    }
    return true;
  }

  #isDomainPrimitive(obj: unknown): obj is DomainPrimitive<Props & (Primitives | Date)> {
    if (Object.prototype.hasOwnProperty.call(obj, "value")) return true;
    return false;
  }
}
