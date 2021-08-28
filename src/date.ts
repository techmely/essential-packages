import { dayjs } from './external';

export function formatDate(date: string, format = 'DD/MM/YYYY'): string {
  if (date) {
    return dayjs(date).format(format);
  }
  return '-';
}
