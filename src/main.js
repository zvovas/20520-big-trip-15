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
import {FilterType, MenuItem, RenderPosition, UpdateType} from './const.js';
import SiteMenuView from './view/site-menu.js';
import NewEventButtonView from './view/new-event-button.js';
import {render} from './utils/render.js';

const TRIP_EVENT_COUNT = 15;

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(allDestinations);

const offersModel = new OffersModel();
offersModel.setOffers(allOffers);

const events = Array(TRIP_EVENT_COUNT).fill().map(generateEvent).sort(compareTimeStart);
const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filtersModel = new FiltersModel();

const pageBodyContainerElements = document.querySelectorAll('.page-body__container');

const tripMainElement = pageBodyContainerElements[0].querySelector('.trip-main');
const siteMenuContainer = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

const pageMainElement = pageBodyContainerElements[1];
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const tripInfoPresenter = new TripInfoPresenter(tripMainElement, eventsModel);
const filtersPresenter = new FiltersPresenter(tripFiltersElement, filtersModel, eventsModel);
const tripPresenter = new BoardPresenter(tripEventsElement, eventsModel, filtersModel, destinationsModel, offersModel);
const statisticsPresenter = new StatisticsPresenter(pageMainElement, eventsModel, offersModel.getEventTypes(), pageBodyContainerElements);

const siteMenuComponent = new SiteMenuView();
const newEventButtonComponent = new NewEventButtonView();

render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);
render(tripMainElement, newEventButtonComponent, RenderPosition.BEFOREEND);

const handleNewEventFormClose = () => {
  newEventButtonComponent.getElement().disabled = false;
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_EVENT:
      statisticsPresenter.destroy();
      tripPresenter.destroy();
      filtersModel.setFilter(UpdateType.RESET, FilterType.EVERYTHING);
      tripPresenter.createEvent(handleNewEventFormClose);
      tripPresenter.init();
      newEventButtonComponent.getElement().disabled = true;
      filtersPresenter.init();
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      break;
    case MenuItem.TABLE:
      statisticsPresenter.destroy();
      tripPresenter.init();
      filtersPresenter.init();
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statisticsPresenter.init();
      filtersPresenter.init(true);
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
newEventButtonComponent.setMenuClickHandler(handleSiteMenuClick);

tripInfoPresenter.init();
tripPresenter.init();
filtersPresenter.init();


