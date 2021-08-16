import SiteMenuView from '../view/site-menu.js';
import EventFiltersView from '../view/event-filters.js';
import TripInfoView from '../view/trip-info.js';
import RouteAndDatesView from '../view/route-and-dates.js';
import TotalPriceView from '../view/total-price.js';
import EventSortView from '../view/event-sort.js';
import EventListView from '../view/event-list.js';
import NoEventView from '../view/no-event.js';
import EventPresenter from './event.js'
import {render, replace} from '../utils/render.js';
import {FILTERS, RenderPosition} from '../const.js';
import EventView from '../view/event.js';
import EditFormView from '../view/edit-form.js';

export default class Trip {
  constructor(boardHeaderContainer, boardMainContainer) {
    this._boardHeaderContainer = boardHeaderContainer;
    this._boardMainContainer = boardMainContainer;

    this._siteMenuComponent = new SiteMenuView();
    this._eventFiltersComponent = new EventFiltersView();
    this._tripInfoComponent = new TripInfoView();
    this._eventSortComponent = new EventSortView();
    this._eventListComponent = new EventListView();
    this._noEventComponent = new NoEventView(FILTERS[0]);
  }

  init(events) {
    this._events = events.slice();

    this._routeAndDatesComponent = new RouteAndDatesView(this._events);
    this._totalPriceComponent = new TotalPriceView(this._events);

    this._renderTrip();
  }

  _renderTrip() {
    this._renderSiteMenu();
    this._renderEventFilters();

    if (!this._events || this._events.length === 0) {
      this._renderNoEvent();
      return;
    }

    this._renderTripInfo();
    this._renderEventSort();
    this._renderEventList();
    this._renderEvents();
  }

  _renderSiteMenu() {
    const siteMenuElement = this._boardHeaderContainer.querySelector('.trip-controls__navigation');
    render(siteMenuElement, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderEventFilters() {
    const eventFilterElement = this._boardHeaderContainer.querySelector('.trip-controls__filters');
    render(eventFilterElement, this._eventFiltersComponent, RenderPosition.BEFOREEND);
  }

  _renderTripInfo() {
    render(this._boardHeaderContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    this._renderRouteAndDates();
    this._renderTotalPrice();
  }

  _renderRouteAndDates() {
    render(this._tripInfoComponent, this._routeAndDatesComponent, RenderPosition.BEFOREEND);
  }

  _renderTotalPrice() {
    render(this._tripInfoComponent, this._totalPriceComponent, RenderPosition.BEFOREEND);
  }

  _renderEventSort() {
    render(this._boardMainContainer, this._eventSortComponent, RenderPosition.BEFOREEND);
  }

  _renderEventList() {
    render(this._boardMainContainer, this._eventListComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent);
    eventPresenter.init(event);
  }

  _renderEvents() {
    this._events.forEach((event) => this._renderEvent(event));
  }

  _renderNoEvent() {
    render(this._boardMainContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }
}
