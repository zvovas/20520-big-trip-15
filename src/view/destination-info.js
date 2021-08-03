const createParagraphTemplate = (description) => `<p class="event__destination-description">${description}</p>`;
const createPhotoTemplate = ({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`;
const createPhotosTemplate = (photos) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.map(createPhotoTemplate).join('')}
    </div>
  </div>`
);

export const createDestinationInfoTemplate = ({description, pictures}) => (
  (!description && (!pictures || !pictures.length))
    ? ''
    : `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            ${(description) ? createParagraphTemplate(description) : ''}

            ${(pictures.length) ? createPhotosTemplate(pictures) : ''}
          </section>`
);
