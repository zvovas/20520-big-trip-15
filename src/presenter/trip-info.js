import TripInfoView from '../view/trip-info.js';
import RouteAndDatesView from '../view/route-and-dates.js';
import TotalPriceView from '../view/total-price.js';
import {render, replace} from '../utils/render.js';
import {RenderPosition} from '../const.js';

export default class TripInfo {
  constructor(boardHeaderContainer, eventsModel) {
    this._boardHeaderContainer = boardHeaderContainer;
    this._eventsModel = eventsModel;

    this._tripInfoComponent = new TripInfoView();
    this._routeAndDatesComponent = new RouteAndDatesView(this._eventsModel.getEvents());
    this._totalPriceComponent = new TotalPriceView(this._eventsModel.getEvents());

    render(this._boardHeaderContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._routeAndDatesComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._totalPriceComponent, RenderPosition.BEFOREEND);
  }

  updateInfo() {
    const prevRouteAndDatesComponent = this._routeAndDatesComponent;
    const prevPriceComponent = this._totalPriceComponent;

    this._routeAndDatesComponent = new RouteAndDatesView(this._eventsModel.getEvents());
    this._totalPriceComponent = new TotalPriceView(this._eventsModel.getEvents());

    replace(this._routeAndDatesComponent, prevRouteAndDatesComponent);
    replace(this._totalPriceComponent, prevPriceComponent);

    prevRouteAndDatesComponent.removeElement();
    prevPriceComponent.removeElement();
  }
}
