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
import Store from './api/store.js';
import Provider from './api/provider.js';
import {render} from './utils/render.js';
import {toast} from './utils/toast.js';
import {isOnline} from './utils/common.js';
import {FilterType, MenuItem, RenderPosition, UpdateType} from './const.js';

const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic dp5em1xxAgL985';
const STORE_PREFIX = 'big-trip-localstorage';
const STORE_VER = 'v15';
const StoreName = {
  EVENTS: `${STORE_PREFIX}-events-${STORE_VER}`,
  DESTINATIONS: `${STORE_PREFIX}-destinations-${STORE_VER}`,
  OFFERS: `${STORE_PREFIX}-offers-${STORE_VER}`,
};

const api = new Api(END_POINT, AUTHORIZATION);
const eventsStore = new Store(StoreName.EVENTS, window.localStorage);
const destinationsStore = new Store(StoreName.DESTINATIONS, window.localStorage);
const offersStore = new Store(StoreName.OFFERS, window.localStorage);
const apiWithProvider = new Provider(api, eventsStore, destinationsStore, offersStore);

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
const tripPresenter = new BoardPresenter(tripEventsElement, eventsModel, filtersModel, destinationsModel, offersModel, apiWithProvider);
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
      tripPresenter.init();
      if (!isOnline()) {
        toast('You can\'t create new task offline');
        siteMenuComponent.setMenuItem(MenuItem.TABLE);
        break;
      }
      tripPresenter.createEvent(handleNewEventFormClose);
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

apiWithProvider.getInitialData()
  .then((results) => {
    const [destinations, offers] = results;
    destinationsModel.setDestinations(destinations);
    offersModel.setOffers(offers);
    isInitialData = true;
  })
  .then(() => apiWithProvider.getPoints())
  .then((events) => {
    eventsModel.setEvents(UpdateType.INIT, events);
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

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
