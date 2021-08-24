import SmartView from './smart.js';
import {DESTINATIONS, EVENT_TYPES} from '../const.js';
import {humanizeDateTime} from '../utils/events.js';
import {allDestinations} from '../mock/destinations.js';
import {allOffers} from '../mock/offers.js';

const BLANK_EVENT = {
  type: EVENT_TYPES[0],
  destination: '',
  offers: [],
  timeStart: '',
  timeEnd: '',
  price: '',
};

const createEventTypeInputTemplate = (type) => (
  `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
  </div>`
);

const createDestinationOptionTemplate = (destination) => `<option value="${destination}"></option>`;

const createOfferTemplate = ({title, price}, isChecked = false) => {
  const checkedStatus = (isChecked) ? 'checked' : '';
  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title.split(' ').join('-')}-1" type="checkbox" name="event-offer-${title.split(' ').join('-')}" ${checkedStatus}>
    <label class="event__offer-label" for="event-offer-${title.split(' ').join('-')}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
};

const createAllOffersTemplate = (offersOfType, offersOfData) => offersOfType.map((offerOfType) => (
  offersOfData.some((offerOfData) => offerOfData.title === offerOfType.title)
    ? createOfferTemplate(offerOfType, true)
    : createOfferTemplate(offerOfType, false)
)).join('');

const createOffersTemplate = (offersOfType, offersOfData) => {

  const offersTemplate = createAllOffersTemplate(offersOfType, offersOfData);

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>`;
};

const createParagraphTemplate = (description) => `<p class="event__destination-description">${description}</p>`;
const createPhotoTemplate = ({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`;
const createPhotosTemplate = (photos) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map(createPhotoTemplate).join('')}
    </div>
  </div>`
);

const createDestinationInfoTemplate = ({description, pictures}) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${(description) ? createParagraphTemplate(description) : ''}

    ${(pictures.length) ? createPhotosTemplate(pictures) : ''}
  </section>`
);

const createEditFormTemplate = (data, isEdit = false) => {
  const {
    type,
    destination,
    offers,
    timeStart,
    timeEnd,
    price,
    offersOfType,
  } = data;

  const eventTypeFieldset = EVENT_TYPES.map((eventType) => createEventTypeInputTemplate(eventType)).join('');
  const destinationDatalist = DESTINATIONS.map((eventDestination) => createDestinationOptionTemplate(eventDestination)).join('');
  const editButton = (isEdit) ? '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>' : '';
  const offersTemplate = (offersOfType && offersOfType.length > 0) ? createOffersTemplate(offersOfType, offers) : '';
  const information = (destination) ? allDestinations.find((item) => item.name === destination) : null;
  const informationTemplate = (!information.description && (!information.pictures || !information.pictures.length)) ? '' : createDestinationInfoTemplate(information);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventTypeFieldset}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationDatalist}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDateTime(timeStart)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDateTime(timeEnd)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        ${editButton}
      </header>
      <section class="event__details">
        ${offersTemplate}

        ${informationTemplate}
      </section>
    </form>
  </li>`;
};

export default class EditForm extends SmartView {
  constructor(event = BLANK_EVENT, isEdit) {
    super();
    this._data = EditForm.parseEventToData(event);
    this._isEdit = isEdit;

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._changeTypeHandler = this._changeTypeHandler.bind(this);
    this._changeOffersHandler = this._changeOffersHandler.bind(this);

    this._setInnerHandler();
  }

  getTemplate() {
    return createEditFormTemplate(this._data, this._isEdit);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeClickHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.submitForm(EditForm.parseDataToEvent(this._data));
  }

  setSubmitFormHandler(callback) {
    this._callback.submitForm = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _changeTypeHandler(evt) {
    evt.preventDefault();
    this.updateData(
      {
        type: evt.target.value,
        offersOfType: allOffers.find((item) => item.type === evt.target.value).offers.slice(),
        offers: [],
      },
    );
  }

  _changeOffersHandler(evt) {
    const name =  evt.target.name.split('-').splice(2).join(' ');

    if (evt.target.checked) {
      this._data.offers.push(this._data.offersOfType.find((offer) => offer.title === name));
    } else {
      this._data.offers.splice(this._data.offers.findIndex((offer) => offer.title === name), 1);
    }
  }

  _setInnerHandler() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._changeTypeHandler);

    if (this._data.offersOfType && this._data.offersOfType.length > 0) {
      this.getElement().querySelector('.event__available-offers').addEventListener('change', this._changeOffersHandler);
    }
  }

  restoreHandlers() {
    this._setInnerHandler();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setSubmitFormHandler(this._callback.submitForm);
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
      {
        offersOfType: allOffers.find((item) => item.type === event.type).offers.slice(),
      },
    );
  }

  static parseDataToEvent(data) {
    const event = Object.assign({}, data);

    delete event.offersOfType;

    return event;
  }
}
