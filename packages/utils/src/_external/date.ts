import dayjs, { OpUnitType, QUnitType } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { isNumber } from '../is';

type CompareDateConfig = {
  unit?: QUnitType | OpUnitType;
  float?: boolean;
};

dayjs.extend(utc);
dayjs.extend(timezone);
const timeZone = dayjs.tz.guess();
dayjs.tz.setDefault(timeZone);

export { dayjs };

/**
 * @param date
 * @param format default value is DD/MM/YYYY
 * @example
 * // Format with HH:mm:ss
 * formatDate(date, 'HH:mm:ss')
 */
export function formatDate(date: dayjs.ConfigType, format = 'DD/MM/YYYY'): string {
  return dayjs(date).format(format);
}

export function formatDateUnixTime(seconds: number, format = 'DD/MM/YYYY') {
  return formatDate(dayjs.unix(seconds).toISOString(), format);
}

export function diffDate(toDate: Date, fromDate: Date, config?: CompareDateConfig) {
  const formattedToDate = dayjs(toDate).format('YYYY-MM-DD');
  const formattedFromDate = dayjs(fromDate).format('YYYY-MM-DD');
  return dayjs(formattedFromDate).diff(dayjs(formattedToDate), config?.unit, config?.float);
}

export function addNewDate(date: Date, addDays = 0): Date {
  return dayjs(date).add(addDays, 'day').toDate();
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export function sortByDate<T>(a: T, b: T, key: keyof T) {
  if (a[key] < b[key]) {
    return 1;
  }
  if (a[key] > b[key]) {
    return -1;
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
  const { locale = 'vi', shouldIgnoreZero = false } = options || {};

  if (shouldIgnoreZero) {
    if (a === b) return 0;
    if (a === 0) return 1;
    if (b === 0) return -1;
  }

  if (isNumber(a) && isNumber(b)) {
    const aParsed = a?.toString() ?? '';
    const bParsed = b?.toString() ?? '';
    result = isNumber(a) && isNumber(b) ? a - b : aParsed.localeCompare(bParsed, locale);
  }

  return direction === SortDirection.ASC ? result : -result;
}
