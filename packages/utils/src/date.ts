import { isNumber } from "./is";

const isSameDay = (date1?: Date, date2?: Date): boolean => {
  if (!(date1 && date2)) {
    return false;
  }

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const isSameMonth = (date1?: Date, date2?: Date): boolean => {
  if (!(date1 && date2)) {
    return false;
  }

  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
};

export const isToday = (date: Date): boolean => isSameDay(date, new Date());

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export function sortByDate<T>(
  a: T,
  b: T,
  key: keyof T,
  direction: SortDirection = SortDirection.ASC,
) {
  if (a[key] < b[key]) {
    return direction === SortDirection.ASC ? 1 : -1;
  }
  if (a[key] > b[key]) {
    return direction === SortDirection.ASC ? -1 : 1;
  }
  return 0;
}

type SortOptions = {
  locale?: string;
  shouldIgnoreZero?: boolean;
};

/**
 * sort string | number data with direction & locale
 * return positive/0/negative result as localeCompare function.
 * @param a
 * @param b
 * @param direction
 * @param options
 */
export function sortData(
  a: unknown,
  b: unknown,
  direction: SortDirection | null = SortDirection.ASC,
  options?: SortOptions,
) {
  let result = 0;
  const { locale = "vi", shouldIgnoreZero = false } = options || {};

  if (shouldIgnoreZero) {
    if (a === b) {
      return 0;
    }
    if (a === 0) {
      return 1;
    }
    if (b === 0) {
      return -1;
    }
  }

  if (isNumber(a) && isNumber(b)) {
    const aParsed = a?.toString() ?? "";
    const bParsed = b?.toString() ?? "";
    result = isNumber(a) && isNumber(b) ? a - b : aParsed.localeCompare(bParsed, locale);
  }

  return direction === SortDirection.ASC ? result : -result;
}

export const suffixAmPm = (h: number): string =>
  `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? "am" : "pm"}`;

export const getQuarter = (d = new Date()): number => Math.ceil((d.getMonth() + 1) / 3);
