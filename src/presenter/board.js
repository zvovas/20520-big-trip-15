import SiteMenuView from '../view/site-menu.js';
import EventFiltersView from '../view/event-filters.js';
import EventSortView from '../view/event-sort.js';
import EventListView from '../view/event-list.js';
import NoEventView from '../view/no-event.js';
import EventPresenter from './event.js';
import TripInfoPresenter from './trip-info.js';
import {remove, render} from '../utils/render.js';
import {FILTERS, RenderPosition, SortType, UpdateType, UserAction} from '../const.js';
import {compareDuration, comparePrice, compareTimeStart} from '../utils/events.js';

export default class Board {
  constructor(boardHeaderContainer, boardMainContainer, eventsModel, destinationsModel, offersModel) {
    this._boardHeaderContainer = boardHeaderContainer;
    this._boardMainContainer = boardMainContainer;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._eventPresenter = new Map();

    this._siteMenuComponent = new SiteMenuView();
    this._eventFiltersComponent = new EventFiltersView();
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
    this._renderTrip();

    this._tripInfoPresenter = new TripInfoPresenter(this._boardHeaderContainer, this._eventsModel);
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

  _handleViewAction(actionType, updateType, update, {isDateStartEqual = true, isDurationEqual = true, isPriceEqual = true} = {}) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        updateType = ((this._currentSortType === SortType.DAY && !isDateStartEqual) ||
          (this._currentSortType === SortType.TIME && !isDurationEqual) ||
          (this._currentSortType === SortType.PRICE && !isPriceEqual)) ? UpdateType.MAJOR : updateType;
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
        this._eventPresenter.get(update.id).init(update);
        this._tripInfoPresenter.updateInfo();
        break;
      case UpdateType.MAJOR:
        this._eventPresenter.get(update.id).init(update);
        this._tripInfoPresenter.updateInfo();
        this._clearBoard();
        this._renderBoard();
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

    this._renderEventSort();
    this._renderBoard();
  }

  _renderSiteMenu() {
    const siteMenuElement = this._boardHeaderContainer.querySelector('.trip-controls__navigation');
    render(siteMenuElement, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderEventFilters() {
    const eventFilterElement = this._boardHeaderContainer.querySelector('.trip-controls__filters');
    render(eventFilterElement, this._eventFiltersComponent, RenderPosition.BEFOREEND);
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
    this._clearBoard();
    this._renderBoard();
  }

  _renderEvents() {
    this._getEvents().forEach((event) => this._renderEvent(event));
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._destinationsModel, this._offersModel, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _handleModeChange() {
    this._eventPresenter.forEach((eventPresenter) => eventPresenter.resetView());
  }

  _renderNoEvent() {
    render(this._boardMainContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._eventPresenter.forEach((eventPresenter) => eventPresenter.destroy());
    this._eventPresenter.clear();

    remove(this._noEventComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderBoard() {
    render(this._boardMainContainer, this._eventListComponent, RenderPosition.BEFOREEND);

    const events = this._getEvents();
    const eventsCount = events.length;

    if (eventsCount === 0) {
      this._renderNoEvent();
      return;
    }

    this._renderEvents();
  }
}
