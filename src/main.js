import EditFormView from './view/edit-form.js';
import EventView from './view/event.js';
import EventFiltersView from './view/event-filters.js';
import EventListView from './view/event-list.js';
import EventSortView from './view/event-sort.js';
import RouteAndDatesView from './view/route-and-dates.js';
import SiteMenuView from './view/site-menu.js';
import TotalPriceView from './view/total-price.js';
import TripInfoView from './view/trip-info.js';
import {compareTimeStart, render} from './utils.js';
import {RenderPosition} from './const.js';

import {generatePoint} from './mock/point.js';

const TRIP_EVENT_COUNT = 15;

const points = Array(TRIP_EVENT_COUNT).fill().map(generatePoint).sort(compareTimeStart);

const renderEvent = (eventListElement, point) => {
  const eventComponent = new EventView(point);
  const editFormComponent = new EditFormView(point, true);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(editFormComponent.getElement(), eventComponent.getElement());
    editFormComponent.getElement().querySelector('form').addEventListener('submit', onSubmit);
    eventComponent.getElement().querySelector('.event__rollup-btn').removeEventListener('click', onOpenRollupButton);
    editFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', onCloseRollupButton);
    document.addEventListener('keydown', onEscKeydown);
  };

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), editFormComponent.getElement());
    editFormComponent.getElement().querySelector('form').removeEventListener('submit', onSubmit);
    editFormComponent.getElement().querySelector('.event__rollup-btn').removeEventListener('click', onCloseRollupButton);
    eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', onOpenRollupButton);
    document.removeEventListener('keydown', onEscKeydown);
  };

  function onSubmit (evt)  {
    evt.preventDefault();
    replaceFormToEvent();
  }

  function onOpenRollupButton () {
    replaceEventToForm();
  }

  function onCloseRollupButton () {
    replaceFormToEvent();
  }

  function onEscKeydown (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
    }
  }

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', onOpenRollupButton);

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const pageHeaderElement = document.querySelector('.page-body');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');

const tripInfoComponent = new TripInfoView();
render(tripMainElement, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoComponent.getElement(), new RouteAndDatesView(points).getElement(), RenderPosition.BEFOREEND);
render(tripInfoComponent.getElement(), new TotalPriceView(points).getElement(), RenderPosition.BEFOREEND);

const siteMenuElement = tripMainElement.querySelector('.trip-controls__navigation');
render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const eventFilterElement = tripMainElement.querySelector('.trip-controls__filters');
render(eventFilterElement, new EventFiltersView().getElement(), RenderPosition.BEFOREEND);

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
render(tripEventsElement, new EventSortView().getElement(), RenderPosition.BEFOREEND);

const eventListComponent = new EventListView();
render(tripEventsElement, eventListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < points.length; i++) {
  renderEvent(eventListComponent.getElement(), points[i]);
}
