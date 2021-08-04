const createOfferTemplate = ({title, price, isChecked = false}) => {
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

const findCheckedOffers = (typeOffers, pointOffers) => {
  typeOffers.forEach((typeOffer) => typeOffer.isChecked = !!pointOffers.some((pointOffer) => pointOffer.title === typeOffer.title));
  return typeOffers;
};

const createAllOffersTemplate = (typeOffers, pointOffers) => (
  (pointOffers && pointOffers.length > 0)
    ? findCheckedOffers(typeOffers, pointOffers).map(createOfferTemplate).join('')
    : typeOffers.map(createOfferTemplate).join('')
);

export const createOffersTemplate = (typeOffers, offers) => {

  const offersTemplate = createAllOffersTemplate(typeOffers, offers);

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>`;
};
