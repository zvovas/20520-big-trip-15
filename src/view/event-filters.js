import AbstractView from './abstract.js';

const createEventFilterTemplate = (filter, currentFilterType) => {
  const {type, name} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
    </div>`
  );
};

const createEventFiltersTemplate = (filters, currentFilterType) => {
  const filtersTemplate = filters.map((filter) => createEventFilterTemplate(filter, currentFilterType)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class EventFilters extends AbstractView {
  constructor(filterItems, currentFilterType) {
    super();
    this._filterItems = filterItems;
    this.currentFilterType = currentFilterType;

    this._changeFilterTypeHandler = this._changeFilterTypeHandler.bind(this);
  }

  getTemplate() {
    return createEventFiltersTemplate(this._filterItems, this.currentFilterType);
  }

  _changeFilterTypeHandler(evt) {
    evt.preventDefault();

    this._callback.changeFilterType(evt.target.value);
  }

  setChangeFilterTypeHandler(callback) {
    this._callback.changeFilterType = callback;
    this.getElement().addEventListener('change', this._changeFilterTypeHandler);
  }
}
