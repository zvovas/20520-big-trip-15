import EventsModel from './model/events.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import FiltersModel from './model/filters.js';
import BoardPresenter from './presenter/board.js';
import FiltersPresenter from './presenter/filters.js';
import StatisticsPresenter from './presenter/statistics.js';
import TripInfoPresenter from './presenter/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import NewEventButtonView from './view/new-event-button.js';
import Api from './api/api.js';
import {render} from './utils/render.js';
import {FilterType, MenuItem, RenderPosition, UpdateType} from './const.js';
import {toast} from './utils/toast.js';

const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic dp5em1xxAgL9q5';

const api = new Api(END_POINT, AUTHORIZATION);

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const filtersModel = new FiltersModel();

const pageBodyContainerElements = document.querySelectorAll('.page-body__container');

const tripMainElement = pageBodyContainerElements[0].querySelector('.trip-main');
const siteMenuContainer = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');

const pageMainElement = pageBodyContainerElements[1];
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const tripInfoPresenter = new TripInfoPresenter(tripMainElement, eventsModel);
const filtersPresenter = new FiltersPresenter(tripFiltersElement, filtersModel, eventsModel);
const tripPresenter = new BoardPresenter(tripEventsElement, eventsModel, filtersModel, destinationsModel, offersModel, api);
const statisticsPresenter = new StatisticsPresenter(pageMainElement, eventsModel, pageBodyContainerElements);

const siteMenuComponent = new SiteMenuView();
const newEventButtonComponent = new NewEventButtonView();

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

const renderControls = (isDisabledNewButton) => {
  newEventButtonComponent.setDisabledState(isDisabledNewButton);
  render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);
  render(tripMainElement, newEventButtonComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  newEventButtonComponent.setMenuClickHandler(handleSiteMenuClick);
};

let isInitialData = false;

api.getInitialData()
  .then((results) => {
    const [destinations, offers] = results;
    destinationsModel.setDestinations(destinations);
    offersModel.setOffers(offers);
    isInitialData = true;
  })
  .then(() => api.getPoints())
  .then((events) => {
    eventsModel.setEvents(UpdateType.INIT, events.map(EventsModel.adaptToClient));
    renderControls();
  })
  .catch(() => {
    if (isInitialData) {
      eventsModel.setEvents(UpdateType.INIT, []);
      renderControls(!isInitialData);
    } else {
      eventsModel.setEvents(UpdateType.INIT, []);
      renderControls(!isInitialData);
      toast('Error loading data');
    }
  });

tripInfoPresenter.init();
tripPresenter.init();
filtersPresenter.init();

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});
