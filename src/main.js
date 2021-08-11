import EditFormView from './view/edit-form.js';
import EventView from './view/event.js';
import EventFiltersView from './view/event-filters.js';
import EventListView from './view/event-list.js';
import EventSortView from './view/event-sort.js';
import RouteAndDatesView from './view/route-and-dates.js';
import SiteMenuView from './view/site-menu.js';
import TotalPriceView from './view/total-price.js';
import TripInfoView from './view/trip-info.js';
import NoEventView from './view/no-event.js';
import {compareTimeStart, render} from './utils.js';
import {FILTERS, RenderPosition} from './const.js';

import {generatePoint} from './mock/point.js';

const TRIP_EVENT_COUNT = 15;

const points = Array(TRIP_EVENT_COUNT).fill().map(generatePoint).sort(compareTimeStart);

const renderEvent = (eventListElement, point) => {
  const eventComponent = new EventView(point);
  const editFormComponent = new EditFormView(point, true);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(editFormComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), editFormComponent.getElement());
  };

  function onEscKeydown (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeydown);
    }
  }

  eventComponent.setEditClickHandler(() => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeydown);
  });

  editFormComponent.setCloseClickHandler(() => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeydown);
  });

  editFormComponent.setSubmitFormHandler(() => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeydown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (events) => {
  const pageHeaderElement = document.querySelector('.page-body');
  const tripMainElement = pageHeaderElement.querySelector('.trip-main');

  const siteMenuElement = tripMainElement.querySelector('.trip-controls__navigation');
  render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

  const eventFilterElement = tripMainElement.querySelector('.trip-controls__filters');
  render(eventFilterElement, new EventFiltersView().getElement(), RenderPosition.BEFOREEND);

  const pageMainElement = document.querySelector('.page-main');
  const tripEventsElement = pageMainElement.querySelector('.trip-events');

  if (!events || events.length === 0) {
    render(tripEventsElement, new NoEventView(FILTERS[0]).getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const tripInfoComponent = new TripInfoView();
  render(tripMainElement, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(tripInfoComponent.getElement(), new RouteAndDatesView(events).getElement(), RenderPosition.BEFOREEND);
  render(tripInfoComponent.getElement(), new TotalPriceView(events).getElement(), RenderPosition.BEFOREEND);


  render(tripEventsElement, new EventSortView().getElement(), RenderPosition.BEFOREEND);

  const eventListComponent = new EventListView();
  render(tripEventsElement, eventListComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < events.length; i++) {
    renderEvent(eventListComponent.getElement(), events[i]);
  }
};

renderBoard(points);
