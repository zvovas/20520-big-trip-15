import SiteMenuView from '../view/site-menu.js';
import EventFiltersView from '../view/event-filters.js';
import TripInfoView from '../view/trip-info.js';
import RouteAndDatesView from '../view/route-and-dates.js';
import TotalPriceView from '../view/total-price.js';
import EventSortView from '../view/event-sort.js';
import EventListView from '../view/event-list.js';
import NoEventView from '../view/no-event.js';
import EventPresenter from './event.js';
import {render} from '../utils/render.js';
import {FILTERS, RenderPosition, SortType, UpdateType, UserAction} from '../const.js';
import {compareDuration, comparePrice, compareTimeStart} from '../utils/events';

export default class Trip {
  constructor(boardHeaderContainer, boardMainContainer, eventsModel) {
    this._boardHeaderContainer = boardHeaderContainer;
    this._boardMainContainer = boardMainContainer;
    this._eventsModel = eventsModel;
    this._eventPresenter = new Map();

    this._siteMenuComponent = new SiteMenuView();
    this._eventFiltersComponent = new EventFiltersView();
    this._tripInfoComponent = new TripInfoView();
    this._eventSortComponent = new EventSortView();
    this._eventListComponent = new EventListView();
    this._noEventComponent = new NoEventView(FILTERS[0]);
    this._currentSortType = SortType.DAY;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleChangeSortType = this._handleChangeSortType.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._routeAndDatesComponent = new RouteAndDatesView(this._getEvents());
    this._totalPriceComponent = new TotalPriceView(this._getEvents());

    this._renderTrip();

    render(this._boardMainContainer, this._eventListComponent, RenderPosition.BEFOREEND);
  }

  _getEvents() {
    const events = this._eventsModel.getEvents();
    switch (this._currentSortType) {
      case SortType.DAY:
        return events.sort(compareTimeStart);
      case SortType.TIME:
        return events.slice().sort(compareDuration);
      case SortType.PRICE:
        return events.slice().sort(comparePrice);
    }
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter.get(update.id).init(update);
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        break;
    }
  }

  _renderTrip() {
    this._renderSiteMenu();
    this._renderEventFilters();

    if (this._getEvents().length === 0) {
      this._renderNoEvent();
      return;
    }

    this._renderTripInfo();
    this._renderEventSort();
    this._renderEventList();
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
    this._eventSortComponent.setChangeSortTypeHandler(this._handleChangeSortType);
  }

  _handleChangeSortType(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearEventList();
    this._renderEventList();
  }

  _renderEventList() {
    this._getEvents().forEach((event) => this._renderEvent(event));
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _handleModeChange() {
    this._eventPresenter.forEach((eventPresenter) => eventPresenter.resetView());
  }

  _clearEventList() {
    this._eventPresenter.forEach((eventPresenter) => eventPresenter.destroy());
    this._eventPresenter.clear();
  }

  _renderNoEvent() {
    render(this._boardMainContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }
}
