import dayjs from 'dayjs';
import {POINT_TYPES, DESTINATIONS} from '../const.js';
import {allOffers} from './offers.js';
import {getRandomInteger, getRandomArrayElement, getRandomArrayElements} from '../utils.js';

const generateType = () => getRandomArrayElement(POINT_TYPES);

const generateDestination = () => getRandomArrayElement(DESTINATIONS);

const generateTimeStart = () => {

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

export const generatePoint = () => {
  const type = generateType();
  const typeOffers = allOffers.find((item) => item.type === type).offers;
  const destination = generateDestination();
  const timeStart = generateTimeStart();
  const timeEnd = dayjs(timeStart).add(getRandomInteger(30, 2160), 'minute').toDate();

  return {
    type,
    destination,
    offers: getRandomArrayElements(typeOffers, getRandomInteger(0, typeOffers.length)),
    timeStart,
    timeEnd,
    price: getRandomInteger(5, 20) * 100,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
