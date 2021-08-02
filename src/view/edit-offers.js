import {allOffers} from '../mock/offers.js';

const createOfferTemplate = (title, price, isChecked) => {
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

export const createOffersTemplate = (pointType, pointOffers) => {
  const typeOffers = allOffers.find((item) => item.type === pointType).offers;

  if (typeOffers.length === 0) {
    return '';
  }

  let offers = '';

  if (!pointOffers || !pointOffers.length) {
    const isChecked = false;
    for (const typeOffer of typeOffers) {
      const {title, price} = typeOffer;
      offers += createOfferTemplate(title, price, isChecked);
    }
  } else {
    for (const typeOffer of typeOffers) {
      const {title, price} = typeOffer;
      const isChecked = (pointOffers.find((item) => item.title === title));
      offers += createOfferTemplate(title, price, isChecked);
    }
  }

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offers}
            </div>
          </section>`;
};
