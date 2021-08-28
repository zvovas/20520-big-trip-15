import AbstractObserver from '../utils/abstract-observer';

// TODO: Подумать о наследовании. Нужно ли оно?
export default class Offers extends AbstractObserver {
  constructor() {
    super();
    this._offers = new Map();
  }

  setOffers(offers) {
    offers.forEach((offer) => this._offers.set(offer.type, offer));
  }

  getOffers(type) {
    return this._offers.get(type);
  }
}
