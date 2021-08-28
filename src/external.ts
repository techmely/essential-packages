import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
const timeZone = dayjs.tz.guess();
dayjs.tz.setDefault(timeZone);

export { dayjs };
