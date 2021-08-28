import AbstractObserver from '../utils/abstract-observer';

// TODO: Подумать о наследовании. Нужно ли оно?
export default class Destinations extends AbstractObserver {
  constructor() {
    super();
    this._destinations = new Map();
  }

  setDestinations(destinations) {
    destinations.forEach((destination) => this._destinations.set(destination.name, destination));
  }

  getDestination(name) {
    return this._destinations.get(name);
  }
}
