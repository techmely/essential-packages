import { isNumber } from './is';

export function formatNumber(
  num: number | undefined | null,
  precision = 0,
  defaultValue: number | string | undefined = '-',
) {
  if (!isNumber(num)) {
    return defaultValue;
  }
  return num.toLocaleString('en', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

export function formatPrice(price: number | undefined | null, precision = 0) {
  return formatNumber(price, precision);
}

export function formatLot10Volume(
  volume: number | undefined | null,
  precision = 0,
  defaultValue: number | string | undefined = '-',
) {
  if (!isNumber(volume)) {
    return defaultValue;
  }
  return (volume * 10)?.toLocaleString('en', { minimumFractionDigits: precision }).slice(0, -1);
}
