export function isStream(val: any) {
  return val !== null && typeof val === "object" && typeof val.pipe === "function";
}
