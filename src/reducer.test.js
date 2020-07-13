import {ActionCreator, ActionType, Operation, reducer} from "./reducer.js";
import {testPlaces} from "./test-data.js";

import createAPI from "./api.js";
import MockAdapter from "axios-mock-adapter";

const testInitialState = {
  city: `Paris`,
  offers: [],
  sortType: `Popular`,
  screen: `default`,
  activeOffer: ``,
};

describe(`Reducer working test`, () => {
  it(`returns initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});

    expect(initialReducer).toEqual(testInitialState);
  });

  it(`changes city with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`,
    })).toEqual({
      city: `Amsterdam`,
      offers: [],
      sortType: `Popular`,
      screen: `default`,
      activeOffer: ``,
    });
  });

  it(`update offers with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.LOAD_OFFERS,
      payload: testPlaces,
    })).toEqual({
      city: `Paris`,
      offers: testPlaces,
      sortType: `Popular`,
      screen: `default`,
      activeOffer: ``,
    });
  });

  it(`changes sort type with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Top rated first`,
    })).toEqual({
      city: `Paris`,
      offers: [],
      sortType: `Top rated first`,
      screen: `default`,
      activeOffer: ``,
    });
  });

  it(`changes screen type with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_SCREEN_TYPE,
      payload: `offer`,
    })).toEqual({
      city: `Paris`,
      offers: [],
      sortType: `Popular`,
      screen: `offer`,
      activeOffer: ``,
    });
  });

  it(`changes active offer with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: `offer-id`,
    })).toEqual({
      city: `Paris`,
      offers: [],
      sortType: `Popular`,
      screen: `default`,
      activeOffer: `offer-id`,
    });
  });
});

describe(`Action creators working test`, () => {
  it(`returns action with city in payload`, () => {
    expect(ActionCreator.changeCity(`Amsterdam`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`,
    });
  });

  it(`returns action with offers in payload`, () => {
    expect(ActionCreator.loadOffers(testPlaces)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: testPlaces,
    });
  });

  it(`returns action with sort type in payload`, () => {
    expect(ActionCreator.changeSortType(`Top rated first`)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Top rated first`,
    });
  });

  it(`returns action with sort type in payload`, () => {
    expect(ActionCreator.changeSortType(`Top rated first`)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Top rated first`,
    });
  });

  it(`returns action with screen type in payload`, () => {
    expect(ActionCreator.changeScreenType(`OFFER`)).toEqual({
      type: ActionType.CHANGE_SCREEN_TYPE,
      payload: `OFFER`,
    });
  });

  it(`returns action with offer id in payload`, () => {
    expect(ActionCreator.changeActiveOffer(`101`)).toEqual({
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: `101`,
    });
  });
});

describe(`Operation working test`, () => {
  it(`makes a correct API call to /questions`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_OFFERS,
          payload: [{fake: true}],
        });
      });
  });
});
