export const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
export const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  FUTURE: 'future',
};
export const NoEventMessage = {
  EVERYTHING: 'Click New Event to create your first event',
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now',
};
export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  RESET: 'RESET',
  INIT: 'INIT',
};

export const MenuItem = {
  ADD_NEW_EVENT: 'ADD_NEW_EVENT',
  TABLE: 'TABLE',
  STATS: 'STATS',
};
