import {getFirstCity} from "./common";
import {getSortedPlaces, sortEventsByPriceToHigh, sortEventsByPriceToLow, sortEventsByRating} from "./sort";
import {SortType} from "../const";

describe(`getFirstCity working test`, () => {
  it(`returns first city data from grouped offers array`, () => {
    const testGroupedOffers = [{
      name: `Amsterdam`,
      location: {
        coordinates: [55.5, 22.2],
        zoom: 10,
      },
      offers: {}
    }, {
      name: `Paris`,
      location: {
        coordinates: [66.6, 33.3],
        zoom: 15,
      },
      offers: {}
    }];

    expect(getFirstCity(testGroupedOffers)).toEqual({
      name: `Amsterdam`,
      location: {
        coordinates: [55.5, 22.2],
        zoom: 10
      }
    });
  });
});

describe(`sort functions working test`, () => {
  it(`returns price difference between first and second objects`, () => {
    expect(sortEventsByPriceToHigh({price: 10}, {price: 5})).toEqual(5);
  });

  it(`returns price difference between second and first objects`, () => {
    expect(sortEventsByPriceToLow({price: 10}, {price: 5})).toEqual(-5);
  });

  it(`returns rating difference between second and first objects`, () => {
    expect(sortEventsByRating({rating: 4}, {rating: 5})).toEqual(1);
  });

  it(`returns sorted offers`, () => {
    const testFirstOffer = {
      price: 100,
      rating: 5
    };
    const testSecondOffer = {
      price: 150,
      rating: 3
    };
    const testThirdOffer = {
      price: 50,
      rating: 4
    };
    const testOffers = [testFirstOffer, testSecondOffer, testThirdOffer];
    const testOffersSortedByPriceToHigh = [testThirdOffer, testFirstOffer, testSecondOffer];
    const testOffersSortedByPriceToLow = [testSecondOffer, testFirstOffer, testThirdOffer];
    const testOffersSortedByRating = [testFirstOffer, testThirdOffer, testSecondOffer];

    expect(getSortedPlaces(testOffers, SortType.POPULAR)).toEqual(testOffers);
    expect(getSortedPlaces(testOffers, SortType.PRICE_TO_HIGH)).toEqual(testOffersSortedByPriceToHigh);
    expect(getSortedPlaces(testOffers, SortType.PRICE_TO_LOW)).toEqual(testOffersSortedByPriceToLow);
    expect(getSortedPlaces(testOffers, SortType.TOP_RATED)).toEqual(testOffersSortedByRating);
  });

  it(`throws error when sort type is unknown`, () => {
    expect(() => getSortedPlaces([], `time`)).toThrowError(`Unknown sort type: time`);
  });
});
