import AbstractView from './abstract.js';
import {humanizeDateDayMonth, humanizeDateMonthDay} from '../utils/events.js';

const MAX_CITIES_IN_ROUTE = 3;

const createRouteTemplate = (destinations) => (destinations.length <= MAX_CITIES_IN_ROUTE)
  ? destinations.map((destination) => destination.name).join('&nbsp;&mdash;&nbsp;')
  : `${destinations[0].name}&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;${destinations[destinations.length - 1].name}`;


const createDatesTemplate =  (events) => {
  const dateStart = events[0].timeStart;
  const dateEnd = events[events.length - 1].timeEnd;
  return (dateStart.getMonth() === dateEnd.getMonth())
    ? `${humanizeDateMonthDay(dateStart)}&nbsp;&mdash;&nbsp;${dateEnd.getDate()}`
    : `${humanizeDateDayMonth(dateStart)}&nbsp;&mdash;&nbsp;${humanizeDateDayMonth(dateEnd)}`;
};

const createRouteAndDatesTemplate = (events) => {
  const destinations = events.map((event) => event.destination);
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${createRouteTemplate(destinations)}</h1>

    <p class="trip-info__dates">${createDatesTemplate(events)}</p>
  </div>`;
};

export default class RouteAndDates extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createRouteAndDatesTemplate(this._events);
  }
}
