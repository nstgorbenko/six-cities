import {ActionCreator, ActionType, Operation, reducer} from "./data.js";
import createAPI from "../../api.js";
import {getCities, getCityOffers, getLoadStatus, getNearbyOffers, getOffers, getReviews} from "./selectors.js";
import {testGroupedPlace, testGroupedPlaces, testPlace, testPlaces, testReviews, testServerOffers, testServerReviews} from "../../test-data.js";

import MockAdapter from "axios-mock-adapter";

const testInitialState = {
  favorites: [],
  loadStatus: `SUCCESS`,
  nearbyOffers: [],
  offers: [],
  reviews: [],
};

const testStore = {
  APP: {
    city: {
      name: `Amsterdam`,
      location: {
        coordinates: [55.5, 22.2],
        zoom: 10,
      }
    },
    sortType: `Top rated first`,
    screen: `offer`,
    activeOffer: 10,
  },
  DATA: {
    favorites: testPlaces,
    loadStatus: `SUCCESS`,
    nearbyOffers: testPlaces,
    offers: testGroupedPlaces,
    reviews: testReviews,
  },
  USER: {
    authorizationStatus: `NO_AUTH`
  }
};

const emptyStore = {
  APP: {
    city: {
      name: ``,
      location: {
        coordinates: [0, 0],
        zoom: 0,
      }
    },
    sortType: `Popular`,
    screen: ``,
    activeOffer: 0,
  },
  DATA: {
    favorites: [],
    loadStatus: `SUCCESS`,
    nearbyOffers: [],
    offers: [],
    reviews: [],
  },
  USER: {
    authorizationStatus: ``,
    info: {
      id: 0,
      name: ``,
      email: ``,
      avatar: ``,
      isSuper: true,
    }
  }
};

const getState = () => emptyStore;

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);

describe(`Reducer working test`, () => {
  it(`returns initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});

    expect(initialReducer).toEqual(testInitialState);
  });

  it(`updates favorite offers with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.LOAD_FAVORITES,
      payload: testPlaces,
    })).toEqual({
      favorites: testPlaces,
      loadStatus: `SUCCESS`,
      nearbyOffers: [],
      offers: [],
      reviews: [],
    });
  });

  it(`updates loadStatus with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.UPDATE_LOAD_STATUS,
      payload: `LOADING`,
    })).toEqual({
      favorites: [],
      loadStatus: `LOADING`,
      nearbyOffers: [],
      offers: [],
      reviews: [],
    });
  });

  it(`updates nearby offers with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: testPlaces,
    })).toEqual({
      favorites: [],
      loadStatus: `SUCCESS`,
      nearbyOffers: testPlaces,
      offers: [],
      reviews: [],
    });
  });

  it(`updates offers with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.LOAD_OFFERS,
      payload: testPlaces,
    })).toEqual({
      favorites: [],
      loadStatus: `SUCCESS`,
      nearbyOffers: [],
      offers: testPlaces,
      reviews: [],
    });
  });

  it(`updates reviews with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.LOAD_REVIEWS,
      payload: testReviews,
    })).toEqual({
      favorites: [],
      loadStatus: `SUCCESS`,
      nearbyOffers: [],
      offers: [],
      reviews: testReviews,
    });
  });
});

describe(`Action creators working test`, () => {
  it(`returns action with favorite offers in payload`, () => {
    expect(ActionCreator.loadFavorites(testPlaces)).toEqual({
      type: ActionType.LOAD_FAVORITES,
      payload: testPlaces,
    });
  });

  it(`returns action with nearby offers in payload`, () => {
    expect(ActionCreator.loadNearbyOffers(testPlaces)).toEqual({
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: testPlaces,
    });
  });

  it(`returns action with offers in payload`, () => {
    expect(ActionCreator.loadOffers(testPlaces)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: testPlaces,
    });
  });

  it(`returns action with reviews in payload`, () => {
    expect(ActionCreator.loadReviews(testReviews)).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: testReviews,
    });
  });

  it(`returns action with loadStatus in payload`, () => {
    expect(ActionCreator.updateLoadStatus(`LOADING`)).toEqual({
      type: ActionType.UPDATE_LOAD_STATUS,
      payload: `LOADING`,
    });
  });
});

describe(`Operation working test`, () => {
  it(`makes a correct API POST call to /favorite`, () => {
    const dispatch = jest.fn();
    const favoriteOffer = {
      hotelId: 10,
      status: 1,
    };
    const favoriteOfferSender = Operation.addToFavorites(favoriteOffer);

    apiMock
      .onPost(`/favorite/${favoriteOffer.hotelId}/${favoriteOffer.status}`)
      .reply(200, testServerOffers[0]);

    return favoriteOfferSender(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: testGroupedPlace,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_FAVORITES,
          payload: [testPlace],
        });
      });
  });

  it(`makes a correct API GET call to /favorite`, () => {
    const dispatch = jest.fn();
    const favoritesLoader = Operation.loadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, testServerOffers);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_FAVORITES,
          payload: testPlaces,
        });
      });
  });

  it(`makes a correct API GET call to /hotels/.../nearby`, () => {
    const dispatch = jest.fn();
    const hotelId = 5;
    const nearbyLoader = Operation.loadNearbyOffers(hotelId);

    apiMock
      .onGet(`/hotels/${hotelId}/nearby`)
      .reply(200, testServerOffers);

    return nearbyLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_NEARBY_OFFERS,
          payload: testPlaces,
        });
      });
  });

  it(`makes a correct API GET call to /hotels`, () => {
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, testServerOffers);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_OFFERS,
          payload: testGroupedPlaces,
        });
      });
  });

  it(`makes a correct API GET call to /comments`, () => {
    const dispatch = jest.fn();
    const hotelId = 5;
    const reviewsLoader = Operation.loadReviews(hotelId);

    apiMock
      .onGet(`/comments/${hotelId}`)
      .reply(200, testServerReviews);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_REVIEWS,
          payload: testReviews,
        });
      });
  });

  it(`makes a correct API POST call to /comments`, () => {
    const dispatch = jest.fn();
    const testReview = {
      hotelId: 1,
      comment: `Nice`,
      rating: 5,
    };
    const reviewSender = Operation.postReview(testReview);

    apiMock
      .onPost(`/comments/${testReview.hotelId}`)
      .reply(200);

    return reviewSender(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_LOAD_STATUS,
          payload: `LOADING`,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.UPDATE_LOAD_STATUS,
          payload: `SUCCESS`,
        });
      });
  });
});

describe(`Selectors working test`, () => {
  it(`returns offers value`, () => {
    expect(getOffers(testStore)).toEqual(testPlaces);
  });

  it(`returns empty array if store offers length equals 0`, () => {
    expect(getOffers(emptyStore)).toEqual([]);
  });

  it(`returns nearby offers value`, () => {
    expect(getNearbyOffers(testStore)).toEqual(testPlaces);
  });

  it(`returns cities value`, () => {
    expect(getCities(testStore)).toEqual([{
      name: `Amsterdam`,
      location: {
        coordinates: [55.5, 22.2],
        zoom: 10,
      }
    }]);
  });

  it(`returns empty array if store offers length equals 0`, () => {
    expect(getCities(emptyStore)).toEqual([]);
  });

  it(`returns city offers value`, () => {
    expect(getCityOffers(testStore)).toEqual(testPlaces);
  });

  it(`returns empty array if store offers length equals 0 and city name is empty string`, () => {
    expect(getCityOffers(emptyStore)).toEqual([]);
  });

  it(`returns loadStatus value`, () => {
    expect(getLoadStatus(testStore)).toEqual(`SUCCESS`);
  });

  it(`returns reviews value`, () => {
    expect(getReviews(testStore)).toEqual(testReviews);
  });
});
