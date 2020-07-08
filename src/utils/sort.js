import {SortType} from "../const.js";

const sortEventsByPriceToHigh = (a, b) => a.price - b.price;

const sortEventsByPriceToLow = (a, b) => b.price - a.price;

const sortEventsByRating = (a, b) => b.rating - a.rating;

export const getSortedPlaces = ([...places], sortType) => {
  switch (sortType) {
    case SortType.POPULAR:
      return places;
    case SortType.PRICE_TO_HIGH:
      return places.sort(sortEventsByPriceToHigh);
    case SortType.PRICE_TO_LOW:
      return places.sort(sortEventsByPriceToLow);
    case SortType.TOP_RATED:
      return places.sort(sortEventsByRating);
    default:
      throw new Error(`Unknown sort type: ${sortType}`);
  }
};
