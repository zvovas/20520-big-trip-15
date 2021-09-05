import StatisticsView from '../view/statistics.js';
import {remove, render} from '../utils/render.js';
import {RenderPosition} from '../const.js';

export default class Statistics {
  constructor(statisticsContainer, eventsModel, eventTypes, pageBodyContainerElements) {
    this._statisticsContainer = statisticsContainer;
    this._eventsModel = eventsModel;
    this._eventTypes = eventTypes;
    this._pageBodyContainerElements = pageBodyContainerElements;
    this._statisticsComponent = null;
  }

  init() {
    if (!this._statisticsComponent) {
      this._statisticsComponent = new StatisticsView(this._eventsModel.getEvents(), this._eventTypes);
    }

    render(this._statisticsContainer, this._statisticsComponent, RenderPosition.BEFOREEND);

    this._pageBodyContainerElements.forEach((element) =>
      element.classList.remove('page-body__container--no-statistics'));
  }

  destroy() {
    if (this._statisticsComponent) {
      remove(this._statisticsComponent);
      this._statisticsComponent = null;
    }
    this._pageBodyContainerElements.forEach((element) =>
      element.classList.add('page-body__container--no-statistics'));
  }
}
