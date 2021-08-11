import AbstractView from './abstract.js';
import {NoEventMessage} from '../const.js';

const createNoEventTemplate = (filter) => `<p class="trip-events__msg">${NoEventMessage[filter.toUpperCase()]}</p>`;

export default class NoEvent extends AbstractView {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createNoEventTemplate(this._filter);
  }
}
