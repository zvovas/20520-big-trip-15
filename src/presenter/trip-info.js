import TripInfoView from '../view/trip-info.js';
import RouteAndDatesView from '../view/route-and-dates.js';
import TotalPriceView from '../view/total-price.js';
import {render, replace, remove} from '../utils/render.js';
import {RenderPosition, UpdateType} from '../const.js';

export default class TripInfo {
  constructor(boardHeaderContainer, eventsModel) {
    this._boardHeaderContainer = boardHeaderContainer;
    this._eventsModel = eventsModel;

    this._tripInfoComponent = new TripInfoView();

    this._routeAndDatesComponent = null;
    this._totalPriceComponent = null;

    render(this._boardHeaderContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    if (this._eventsModel.getEvents().length === 0) {
      remove(this._routeAndDatesComponent);
      remove(this._totalPriceComponent);
      return;
    }

    if (!this._routeAndDatesComponent && !this._totalPriceComponent) {
      this._routeAndDatesComponent = new RouteAndDatesView(this._eventsModel.getEvents());
      this._totalPriceComponent = new TotalPriceView(this._eventsModel.getEvents());
    }

    render(this._tripInfoComponent, this._routeAndDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._totalPriceComponent, RenderPosition.BEFOREEND);

    const prevRouteAndDatesComponent = this._routeAndDatesComponent;
    const prevPriceComponent = this._totalPriceComponent;

    this._routeAndDatesComponent = new RouteAndDatesView(this._eventsModel.getEvents());
    this._totalPriceComponent = new TotalPriceView(this._eventsModel.getEvents());

    replace(this._routeAndDatesComponent, prevRouteAndDatesComponent);
    replace(this._totalPriceComponent, prevPriceComponent);

    prevRouteAndDatesComponent.removeElement();
    prevPriceComponent.removeElement();
  }

  _handleModelEvent(updateType) {
    if (updateType === UpdateType.MINOR
      || updateType === UpdateType.MAJOR
      || updateType === UpdateType.RESET
      || updateType === UpdateType.INIT) {
      this.init();
    }
  }
}
