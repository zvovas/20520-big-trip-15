import {DESTINATIONS, POINT_TYPES} from '../const.js';
import {humanizeDateTime} from '../utils.js';
import {createOffersTemplate} from './edit-offers.js';
import {createDestinationInfoTemplate} from './destination-info.js';
import {allDestinations} from '../mock/destinations.js';

const createEventTypeInputTemplate = (type) => (
  `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
  </div>`
);

const createDestinationOptionTemplate = (destination) => `<option value="${destination}"></option>`;

export const createEditFormTemplate = (point = {}, isEdit = false) => {
  const {
    type = POINT_TYPES[0],
    destination = '',
    offers = null,
    timeStart,
    timeEnd,
    price = '',
  } = point;


  const information = (destination) ? allDestinations.find((item) => item.name === destination) : null;
  const pointTypeFieldset = POINT_TYPES.map((pointType) => createEventTypeInputTemplate(pointType)).join('');
  const destinationDatalist = DESTINATIONS.map((pointDestination) => createDestinationOptionTemplate(pointDestination)).join('');
  const editButton = (isEdit) ? '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>' : '';

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
              ${pointTypeFieldset}
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
        ${createOffersTemplate(type, offers)}

        ${createDestinationInfoTemplate(information)}
      </section>
    </form>
  </li>`;
};
