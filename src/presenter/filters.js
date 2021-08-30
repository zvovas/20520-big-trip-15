import EventFiltersView from '../view/event-filters.js';
import {FilterType, RenderPosition, UpdateType} from '../const.js';
import {render} from '../utils/render.js';

export default class Filters {
  constructor(filterContainer, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;

    this._filterComponent = new EventFiltersView(this._getFilters(), this._filterModel.getFilter());

    render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);

    this._handleChangeFilterType = this._handleChangeFilterType.bind(this);
    this._filterComponent.setChangeFilterTypeHandler(this._handleChangeFilterType);
  }

  _getFilters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
      },
      {
        type: FilterType.PAST,
        name: 'Past',
      },
    ];
  }

  _handleChangeFilterType(type) {
    console.log(this._filterModel);
    if (this._filterModel.getFilter() === type) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, type);
  }
}
