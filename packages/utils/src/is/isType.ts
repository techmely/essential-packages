function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined';
export const isUndef = <T = any>(val?: T): val is T => !isDef(val);

export function isNotNull<T>(v: T | null): v is Exclude<T, null> {
  return v !== null;
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

export function isArray(val: any): val is any[] {
  return val && Array.isArray(val);
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isPrimitive(value: unknown): boolean {
  if (value === null) {
    return true;
  }

  return !['array', 'function', 'object'].includes(typeof value);
}
