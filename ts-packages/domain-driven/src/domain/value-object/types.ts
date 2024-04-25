export type Primitives = string | number | boolean;
export interface DomainPrimitive<T extends Primitives | Date> {
  value: T;
}

export type ValueObjectProps<T> = T extends Primitives | Date ? DomainPrimitive<T> : T;
export type ValueObjectOptions = {
  parser: typeof JSON;
};

export interface ValueObjectPort<Props> {
  clone(): ValueObjectPort<Props>;
  raw(): any;
  isEqual(vo?: this): boolean;
}
