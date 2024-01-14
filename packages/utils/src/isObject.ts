export function isObject(val: any): val is object {
  return toString.call(val) === "[object Object]";
}
