import SiteMenuPresenter from './presenter/site-menu.js';
import FiltersPresenter from './presenter/filters.js';
import BoardPresenter from './presenter/board.js';
import StatisticsPresenter from './presenter/statistics.js';
import EventsModel from './model/events.js';
import OffersModel from './model/offers.js';
import FiltersModel from './model/filters.js';
import DestinationsModel from './model/destinations.js';
import {compareTimeStart} from './utils/events.js';

import {generateEvent} from './mock/event.js';
import {allDestinations} from './mock/destinations.js';
import {allOffers} from './mock/offers.js';
import TripInfoPresenter from './presenter/trip-info.js';
import {DESTINATIONS, EVENT_TYPES} from './const.js';

const TRIP_EVENT_COUNT = 15;

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(DESTINATIONS, allDestinations);

const offersModel = new OffersModel();
offersModel.setOffers(EVENT_TYPES, allOffers);

const events = Array(TRIP_EVENT_COUNT).fill().map(generateEvent).sort(compareTimeStart);
const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filtersModel = new FiltersModel();

const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const siteMenuContainer = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

const pageMainElement = document.querySelector('.page-main .page-body__container');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const tripInfoPresenter = new TripInfoPresenter(tripMainElement, eventsModel);
const filtersPresenter = new FiltersPresenter(tripFiltersElement, filtersModel, eventsModel);
const tripPresenter = new BoardPresenter(tripEventsElement, eventsModel, filtersModel, destinationsModel, offersModel);
const statisticsPresenter = new StatisticsPresenter(pageMainElement, eventsModel);
new SiteMenuPresenter(tripMainElement, siteMenuContainer, tripPresenter, statisticsPresenter, filtersModel);
tripInfoPresenter.init();
tripPresenter.init();
filtersPresenter.init();


