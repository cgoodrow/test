import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc);
dayjs.extend(LocalizedFormat)

export const formatDecimal = value => (Math.round(parseFloat(value) * 100) / 100).toFixed(2);

export const formatDateUTCLocalWithTime = value => {
    return value ? dayjs.utc(value).local().format('L LT') : null;
  };

export const handleFocus = e => {
  return document.getElementById(e.target.id).select();
}
