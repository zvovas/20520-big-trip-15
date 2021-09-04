export default class Offers {
  constructor() {
    this._offers = new Map();
  }

  setOffers(offers) {
    offers.forEach((offer) => this._offers.set(offer.type, offer));
  }

  getOffers() {
    return this._offers;
  }

  getEventTypes() {
    return [...this._offers.keys()];
  }
}
