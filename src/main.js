import TripPresenter from './presenter/board.js';
import {compareTimeStart} from './utils/dates.js';

import {generatePoint} from './mock/point.js';

const TRIP_EVENT_COUNT = 15;

const points = Array(TRIP_EVENT_COUNT).fill(null).map(generatePoint).sort(compareTimeStart);

const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripMainElement, tripEventsElement);
tripPresenter.init(points);
