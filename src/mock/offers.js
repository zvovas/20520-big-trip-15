import {getRandomArrayElement, getRandomInteger} from '../utils.js';
import {POINT_TYPES} from '../const.js';

const MAX_COUNT_OFFERS = 5;

const generateOffersForType = (type, countOffers) => {
  const titles = [
    'Lorem ipsum',
    'Cras aliquet',
    'Nullam nunc ex',
    'Aliquam id orci',
    'Phasellus eros',
    'Sed sed nisi',
    'Sed blandit',
  ];

  const offers = [];

  for (let i = 0; i < countOffers; i++) {
    offers.push({
      title: `${i} ${type} ${getRandomArrayElement(titles)}`,
      price: getRandomInteger(1, 20) * 10,
    });
  }

  return offers;
};

const generateAllOffers = () => {
  const offersForTypes = [];
  for (const pointType of POINT_TYPES) {
    offersForTypes.push({
      type: pointType,
      offers: generateOffersForType(pointType, getRandomInteger(0, MAX_COUNT_OFFERS)),
    });
  }
  return offersForTypes;
};

export const allOffers = generateAllOffers();
