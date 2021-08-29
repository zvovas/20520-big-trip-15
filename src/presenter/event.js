import EventView from '../view/event.js';
import EditFormView from '../view/edit-form.js';
import {remove, render, replace} from '../utils/render.js';
import {RenderPosition, UpdateType, UserAction} from '../const.js';
import {isDatesEqual, calculateDuration} from '../utils/events.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Event {
  constructor(eventListContainer, destinationsModel, offersModel, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._editFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleChangeDestination = this._handleChangeDestination.bind(this);
    this._handleChangeType = this._handleChangeType.bind(this);
    this._handleSubmitForm = this._handleSubmitForm.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEditFormComponent = this._editFormComponent;

    const destinationInfo = this._destinationsModel.getDestination(this._event.destination);
    const currentOffers = this._offersModel.getOffers(this._event.type);

    this._eventComponent = new EventView(event);
    this._editFormComponent = new EditFormView(event, destinationInfo, currentOffers, true);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._editFormComponent.setCloseClickHandler(this._handleCloseClick);
    this._editFormComponent.setChangeDestinationHandler(this._handleChangeDestination);
    this._editFormComponent.setChangeTypeHandler(this._handleChangeType);
    this._editFormComponent.setSubmitFormHandler(this._handleSubmitForm);

    if (prevEventComponent === null || prevEditFormComponent === null) {
      render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventListContainer.getElement().contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._eventListContainer.getElement().contains(prevEditFormComponent.getElement())) {
      replace(this._editFormComponent, prevEditFormComponent);
    }

    remove(prevEventComponent);
    remove(prevEditFormComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._editFormComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _replaceEventToForm() {
    replace(this._editFormComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeydownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._editFormComponent);
    document.removeEventListener('keydown', this._escKeydownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._editFormComponent.reset(this._event);
      this._replaceFormToEvent();
    }
  }

  _handleEditClick() {
    this._replaceEventToForm();
  }

  _handleCloseClick() {
    this._replaceFormToEvent();
  }

  _handleChangeDestination(newDestination) {
    return this._destinationsModel.getDestination(newDestination);
  }

  _handleChangeType(newType) {
    return this._offersModel.getOffers(newType);
  }

  _handleSubmitForm(event) {
    const isDateStartEqual = isDatesEqual(this._event.timeStart, event.timeStart);
    const isDurationEqual = calculateDuration(this._event) === calculateDuration(event);
    const isPriceEqual = this._event.price === event.price;
    const isOffersPriceEqual = this._event.offers.reduce((sum, offer) => sum + offer.price, 0) === event.offers.reduce((sum, offer) => sum + offer.price, 0);
    const isDestinationEqual = this._event.destination === event.destination;
    const isDateEndEqual = isDatesEqual(this._event.timeEnd, event.timeEnd);

    const isMinorUpdate = !isPriceEqual || !isOffersPriceEqual || !isDestinationEqual || !isDateEndEqual;

    this._changeData(UserAction.UPDATE_EVENT, isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, event, {isDateStartEqual, isDurationEqual, isPriceEqual});
    this._replaceFormToEvent();
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._event,
        {
          isFavorite: !this._event.isFavorite,
        },
      ),
    );
  }
}
