import BoardPresenter from './presenter/board.js';
import EventsModel from './model/events.js';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';
import {compareTimeStart} from './utils/events.js';

import {generateEvent} from './mock/event.js';
import {allDestinations} from './mock/destinations';
import {allOffers} from './mock/offers';

const TRIP_EVENT_COUNT = 15;

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(allDestinations);

const offersModel = new OffersModel();
offersModel.setOffers(allOffers);

const events = Array(TRIP_EVENT_COUNT).fill().map(generateEvent).sort(compareTimeStart);
const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const tripPresenter = new BoardPresenter(tripMainElement, tripEventsElement, eventsModel, destinationsModel, offersModel);
tripPresenter.init();
