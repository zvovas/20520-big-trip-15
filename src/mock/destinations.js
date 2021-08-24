import {getRandomArrayElements, getRandomInteger} from '../utils/common.js';
import {DESTINATIONS} from '../const.js';

const MIN_COUNT_SENTENCES = 1;
const MAX_COUNT_SENTENCES = 5;
const MIN_COUNT_PHOTOS = 1;
const MAX_COUNT_PHOTOS = 5;

const generateDescription = () => {
  const sentences = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];
  return getRandomArrayElements(sentences, getRandomInteger(MIN_COUNT_SENTENCES, MAX_COUNT_SENTENCES)).join(' ');
};

const generatePhotos = () => {
  const photos = [];
  for (let i = 0; i < getRandomInteger(MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS); i++) {
    photos.push({
      src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 1000)}`,
      description: 'Alt text for image',
    });
  }
  return photos;
};

const generateAllDestinations = () => {
  const descriptions = [];
  for (const destination of DESTINATIONS) {
    descriptions.push({
      name: destination,
      description: getRandomInteger(0, 1) ? generateDescription() : null,
      pictures: getRandomInteger(0, 1) ? generatePhotos() : null,
    });
  }
  return descriptions;
};

export const allDestinations = generateAllDestinations();
