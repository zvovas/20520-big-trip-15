import {RenderPosition} from './const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(duration);

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

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

const getLeadingZero = (number) => (number < 10) ? `0${number}` : `${number}`;

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

export const compareTimeStart = (pointA, pointB) => pointA.timeStart - pointB.timeStart;
