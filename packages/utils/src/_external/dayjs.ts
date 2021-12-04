import dayjs, { OpUnitType, QUnitType } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

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
