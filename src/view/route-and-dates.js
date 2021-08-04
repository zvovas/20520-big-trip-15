import {humanizeDateDayMonth, humanizeDateMonthDay} from '../utils.js';

const MAX_CITIES_IN_ROUTE = 3;

const createRouteTemplate = (destinations) => (destinations.length <= MAX_CITIES_IN_ROUTE)
  ? destinations.join('&nbsp;&mdash;&nbsp;')
  : `${destinations[0]}&nbsp;&mdash;&nbsp;&hellip;&nbsp;&mdash;&nbsp;${destinations[destinations.length - 1]}`;


const createDatesTemplate =  (points) => {
  const dateStart = points[0].timeStart;
  const dateEnd = points[points.length - 1].timeEnd;
  return (dateStart.getMonth() === dateEnd.getMonth())
    ? `${humanizeDateMonthDay(dateStart)}&nbsp;&mdash;&nbsp;${dateEnd.getDay()}`
    : `${humanizeDateDayMonth(dateStart)}&nbsp;&mdash;&nbsp;${humanizeDateDayMonth(dateEnd)}`;
};

export const createRouteAndDatesTemplate = (points) => {
  const destinations = points.map((point) => point.destination);
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${createRouteTemplate(destinations)}</h1>

    <p class="trip-info__dates">${createDatesTemplate(points)}</p>
  </div>`;
};
