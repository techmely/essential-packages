export function toNumber(value: string): number | string {
  const n = parseFloat(value);

  return Number.isNaN(n) ? value : n;
}
