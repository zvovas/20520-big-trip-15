import {createTripInfoTemplate} from './view/trip-info.js';
import {createRouteAndDatesTemplate} from './view/route-and-dates.js';
import {createTotalPriceTemplate} from './view/total-price.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createEventFilterTemplate} from './view/event-filters.js';
import {createEventSortTemplate} from './view/event-sort.js';
import {createEventListTemplate} from './view/event-list.js';
import {createEditFormTemplate} from './view/edit-form.js';
import {createEventTemplate} from './view/event.js';
import {compareTimeStart} from './utils.js';

import {generatePoint} from './mock/point.js';

const TRIP_EVENT_COUNT = 15;

const points = Array(TRIP_EVENT_COUNT).fill().map(generatePoint).sort(compareTimeStart);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeaderElement = document.querySelector('.page-body');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');
const tripInfoElement = tripMainElement.querySelector('.trip-info');
render(tripInfoElement, createRouteAndDatesTemplate(), 'beforeend');
render(tripInfoElement, createTotalPriceTemplate(), 'beforeend');


const siteMenuElement = tripMainElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');

const eventFilterElement = tripMainElement.querySelector('.trip-controls__filters');
render(eventFilterElement, createEventFilterTemplate(), 'beforeend');

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

render(tripEventsElement, createEventSortTemplate(), 'beforeend');

render(tripEventsElement, createEventListTemplate(), 'beforeend');
const tripEventListElement = tripEventsElement.querySelector('.trip-events__list');
render(tripEventListElement, createEditFormTemplate(), 'beforeend');
render(tripEventListElement, createEditFormTemplate(points[1], true), 'beforeend');
for (let i = 2; i < TRIP_EVENT_COUNT; i++) {
  render(tripEventListElement, createEventTemplate(points[i]), 'beforeend');
}
