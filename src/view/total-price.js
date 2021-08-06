import {createElement} from '../utils.js';

const calculateItem = (sum, item) => (!item.offers || !(item.offers.length > 0))
  ? sum + item.price
  : item.price + item.offers.reduce(calculateItem, sum);

const createTotalPriceTemplate = (points) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${points.reduce(calculateItem, 0)}</span>
  </p>`
);

export default class TotalPrice {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTotalPriceTemplate(this._points);
  }

  getElement () {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
