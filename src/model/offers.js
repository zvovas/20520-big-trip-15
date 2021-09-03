export default class Offers {
  constructor() {
    this._offers = new Map();
  }

  _findOffers(eventType, allOffers) {
    const typeOffers = allOffers.find((offers) => offers.type === eventType);
    return typeOffers ? typeOffers.offers : null;
  }

  setOffers(eventTypes, allOffers) {
    eventTypes.forEach((eventType) => this._offers.set(eventType, this._findOffers(eventType, allOffers)));
  }

  getOffers() {
    return this._offers;
  }

  getEventTypes() {
    return [...this._offers.keys()];
  }
}
