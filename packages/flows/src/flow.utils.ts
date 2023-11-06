import type { Lazy } from "./flow.types";

function isLazyFn<T>(value: Lazy<T>): value is () => T {
  return typeof value === "function";
}

export function unwrapLazyFn<T>(value: Lazy<T>): T {
  if (isLazyFn(value)) {
    return value();
  }
  return value;
}

let _flow_store_id = 0;

export function getIncreaseID() {
  const current = _flow_store_id;
  _flow_store_id += 1;
  return current;
}

export const C_FLOW_NOT_OWNER =
  "[flows-state]: Using FlowContainer without <FlowProvider> or createRoot() context is fuc** up.";
