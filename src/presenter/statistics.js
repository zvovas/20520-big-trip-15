import StatisticsView from '../view/statistics.js';
import {remove, render} from '../utils/render.js';
import {RenderPosition} from '../const.js';

export default class Statistics {
  constructor(statisticsContainer, eventsModel) {
    this._statisticsContainer = statisticsContainer;
    this._eventsModel = eventsModel;
    this._statisticsComponent = null;
  }

  init() {
    if (!this._statisticsComponent) {
      this._statisticsComponent = new StatisticsView(this._eventsModel.getEvents());
    }

    render(this._statisticsContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    if (this._statisticsComponent) {
      remove(this._statisticsComponent);
      this._statisticsComponent = null;
    }
  }
}
