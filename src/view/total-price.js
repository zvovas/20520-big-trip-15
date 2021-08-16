import AbstractView from './abstract.js';

const calculateItem = (sum, item) => (!item.offers || !(item.offers.length > 0))
  ? sum + item.price
  : item.price + item.offers.reduce(calculateItem, sum);

const createTotalPriceTemplate = (events) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${events.reduce(calculateItem, 0)}</span>
  </p>`
);

export default class TotalPrice extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTotalPriceTemplate(this._events);
  }
}
