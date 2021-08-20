import EventSortView from '../view/event-sort.js';
import {render} from '../utils/render.js';
import {RenderPosition, SortType} from '../const.js';
import {compareDuration, comparePrice, compareTimeStart} from '../utils/events.js';

export default class Sort {
  constructor(sortContainer, events, changeOrder) {
    this._sortContainer = sortContainer;
    this._events = events;
    this._changeOrder = changeOrder;

    this._eventSortComponent = new EventSortView();

    render(this._sortContainer, this._eventSortComponent, RenderPosition.BEFOREEND);

    this._handleChangeSortType = this._handleChangeSortType.bind(this);
    this._eventSortComponent.setChangeSortTypeHandler(this._handleChangeSortType);
  }

  _sortByTimeStart() {
    this._events.sort(compareTimeStart);
  }

  _sortByDuration() {
    this._events.sort(compareDuration);
  }

  _sortByPrice() {
    this._events.sort(comparePrice);
  }

  _handleChangeSortType(newSortType) {
    switch (newSortType) {
      case SortType.DAY:
        this._sortByTimeStart();
        break;
      case SortType.TIME:
        this._sortByDuration();
        break;
      case SortType.PRICE:
        this._sortByPrice();
        break;
    }
    this._changeOrder();
  }
}
