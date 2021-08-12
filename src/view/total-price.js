import AbstractView from './abstract.js';

const calculateItem = (sum, item) => (!item.offers || !(item.offers.length > 0))
  ? sum + item.price
  : item.price + item.offers.reduce(calculateItem, sum);

const createTotalPriceTemplate = (points) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${points.reduce(calculateItem, 0)}</span>
  </p>`
);

export default class TotalPrice extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTotalPriceTemplate(this._points);
  }
}
