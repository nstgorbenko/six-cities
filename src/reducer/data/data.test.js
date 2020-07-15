import {ActionCreator, ActionType, Operation, reducer} from "./data.js";
import createAPI from "../../api.js";
import {testGroupedPlaces, testPlaces, testServerData} from "../../test-data.js";

import MockAdapter from "axios-mock-adapter";

const testInitialState = {
  offers: [],
};

describe(`Reducer working test`, () => {
  it(`returns initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});

    expect(initialReducer).toEqual(testInitialState);
  });

  it(`update offers with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.LOAD_OFFERS,
      payload: testPlaces,
    })).toEqual({
      offers: testPlaces,
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
});

describe(`Operation working test`, () => {
  it(`makes a correct API call to /questions`, () => {
    const api = createAPI(() => {});
    const apiMock = new MockAdapter(api);
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
});
