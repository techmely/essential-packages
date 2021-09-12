import { dayjs } from './_external';
/**
 * @description Format a date to a format which you want
 * @param {string} date - The input date
 * @param {string} format - The format type
 * @returns {string} - The date formatted
 */
export function formatDate(date: string, format = 'DD/MM/YYYY'): string {
  if (date) {
    return dayjs(date).format(format);
  }
  return '-';
}
