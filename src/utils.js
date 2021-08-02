import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export function getRandomArrayElements (array, count) {
  count = Math.min(array.length, count);
  const fullArray = array.slice();
  const currentArray = [];
  for (let ind = 0; ind < count; ind++) {
    currentArray.push(...fullArray.splice(getRandomInteger(0, fullArray.length - 1), 1));
  }
  return currentArray;
}

export const convertDateToISO = (date, isWithTime = true) => {
  if (isWithTime) {
    return dayjs(date).format('YYYY-MM-DD[T]HH:mm[:00]');
  }

  return dayjs(date).format('YYYY-MM-DD');
};
export const humanizeDateTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');
export const humanizeDate = (date) => dayjs(date).format('MMM D').toUpperCase();
export const humanizeTime = (date) => dayjs(date).format('HH:mm');
export const calculateTimeDifference = (dateA, dateB) => {
  const difference = dateA - dateB;
  const countOfDay = dayjs.duration(difference, 'millisecond').days();
  const countOfHour = dayjs.duration(difference, 'millisecond').hours() % 24;
  const countOfMinutes = dayjs.duration(difference, 'millisecond').minutes() % 60;

  if (countOfDay > 0) {
    return `${countOfDay}D ${countOfHour}H ${countOfMinutes}M`;
  } else if (countOfHour > 0) {
    return `${countOfHour}H ${countOfMinutes}M`;
  } else {
    return `${countOfMinutes}M`;
  }
};

export const compareTimeStart = (pointA, pointB) => pointA.timeStart - pointB.timeStart;
