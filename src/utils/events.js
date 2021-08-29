import {getLeadingZero} from './common.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

export const convertDateToISO = (date, isWithTime = true) => {
  if (isWithTime) {
    return dayjs(date).format('YYYY-MM-DD[T]HH:mm[:00]');
  }

  return dayjs(date).format('YYYY-MM-DD');
};
export const humanizeDateTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');
export const humanizeDateMonthDay = (date) => dayjs(date).format('MMM D').toUpperCase();
export const humanizeDateDayMonth = (date) => dayjs(date).format('D MMM').toUpperCase();
export const humanizeTime = (date) => dayjs(date).format('HH:mm');
export const calculateTimeDifference = (dateA, dateB) => {
  const difference = dateA - dateB;
  const countOfDay = dayjs.duration(difference, 'millisecond').days();
  const countOfHour = dayjs.duration(difference, 'millisecond').hours() % 24;
  const countOfMinutes = dayjs.duration(difference, 'millisecond').minutes() % 60;

  if (countOfDay > 0) {
    return `${getLeadingZero(countOfDay)}D ${getLeadingZero(countOfHour)}H ${getLeadingZero(countOfMinutes)}M`;
  } else if (countOfHour > 0) {
    return `${getLeadingZero(countOfHour)}H ${getLeadingZero(countOfMinutes)}M`;
  } else {
    return `${getLeadingZero(countOfMinutes)}M`;
  }
};
export const calculateDuration = (event) => event.timeEnd - event.timeStart;

export const isDatesEqual = (dateA, dateB) =>  (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');

export const compareTimeStart = (eventB, eventA) => eventA.timeStart - eventB.timeStart;
export const compareDuration = (eventA, eventB) => calculateDuration(eventB) - calculateDuration(eventA);
export const comparePrice = (eventA, eventB) => eventB.price - eventA.price;
