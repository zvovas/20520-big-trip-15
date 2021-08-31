export default class Destinations {
  constructor() {
    this._destinations = new Map();
  }

  _findDestinationInfo(destination, destinationsInfo) {
    const information = destinationsInfo.find((destinationInfo) => destinationInfo.name === destination);
    return information ? Object.assign({},
      {
        description: information.description,
        pictures: information.pictures,
      }) : null;
  }

  setDestinations(destinations, destinationsInfo) {
    destinations.forEach((destination) => this._destinations.set(destination, this._findDestinationInfo(destination, destinationsInfo)));
  }

  getDestinations() {
    return this._destinations;
  }
}
