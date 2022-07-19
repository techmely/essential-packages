export function snake2camel(src: string) {
  return src.replace(/_([a-z])/g, g => g[1].toUpperCase());
}

export function capitalizeFirst(value: string) {
  return value.replace(/^./, value[0].toUpperCase());
}

export const toString = (v: any) => Object.prototype.toString.call(v);
