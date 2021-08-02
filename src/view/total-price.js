const calculateTotalPrice = (points) => {
  let result = 0;
  for (const point of points) {
    result += point.price;
    if (point.offers || point.offers.length > 0) {
      for (const offer of point.offers) {
        result += offer.price;
      }
    }
  }
  return result;
};

export const createTotalPriceTemplate = (points) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice(points)}</span>
  </p>`
);
