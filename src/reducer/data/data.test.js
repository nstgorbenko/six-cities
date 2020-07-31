import {ActionCreator, ActionType, Operation, reducer} from "./data.js";
import createAPI from "../../api.js";
import {getOffers, getCities, getCityOffers, getLoadStatus} from "./selectors.js";
import {testGroupedPlaces, testPlaces, testServerData} from "../../test-data.js";

import MockAdapter from "axios-mock-adapter";

const testInitialState = {
  loadStatus: `SUCCESS`,
  offers: [],
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
    loadStatus: `SUCCESS`,
    offers: testGroupedPlaces,
  },
  USER: {
    authorizationStatus: `NO_AUTH`
  }
};

const emptyStore = Object.assign({}, testStore, {
  APP: {city: {name: ``}},
  DATA: {offers: []},
});

const testReviewData = {
  hotelId: 1,
  comment: `Nice`,
  rating: 5,
};

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);

describe(`Reducer working test`, () => {
  it(`returns initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});

    expect(initialReducer).toEqual(testInitialState);
  });

  it(`updates offers with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.LOAD_OFFERS,
      payload: testPlaces,
    })).toEqual({
      loadStatus: `SUCCESS`,
      offers: testPlaces,
    });
  });

  it(`updates loadStatus with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.UPDATE_LOAD_STATUS,
      payload: `LOADING`,
    })).toEqual({
      loadStatus: `LOADING`,
      offers: [],
    });
  });
});

describe(`Action creators working test`, () => {
  it(`returns action with offers in payload`, () => {
    expect(ActionCreator.loadOffers(testPlaces)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: testPlaces,
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
  it(`makes a correct API GET call to /hotels`, () => {
    const dispatch = jest.fn();
    const questionLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, testServerData);

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_OFFERS,
          payload: testGroupedPlaces,
        });
      });
  });

  it(`makes a correct API POST call to /comments`, () => {
    const dispatch = jest.fn();
    const reviewSender = Operation.postReview(testReviewData);

    apiMock
      .onPost(`/comments/${testReviewData.hotelId}`)
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
    expect(getOffers(testStore)).toEqual(testGroupedPlaces);
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

  it(`returns empty array if store offers length < 0`, () => {
    expect(getCities(emptyStore)).toEqual([]);
  });

  it(`returns city offers value`, () => {
    expect(getCityOffers(testStore)).toEqual(testPlaces);
  });

  it(`returns empty array if store offers length < 0 and city name is empty string`, () => {
    expect(getCityOffers(emptyStore)).toEqual([]);
  });

  it(`returns loadStatus value`, () => {
    expect(getLoadStatus(testStore)).toEqual(`SUCCESS`);
  });
});
