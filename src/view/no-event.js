import {NoEventMessage} from '../const.js';
import {createElement} from '../utils.js';

const createNoEventTemplate = (filter) => `<p class="trip-events__msg">${NoEventMessage[filter.toUpperCase()]}</p>`;

export default class NoEvent {
  constructor(filter) {
    this._filter = filter;
    this._element = null;
  }

  getTemplate() {
    return createNoEventTemplate(this._filter);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
