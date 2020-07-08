import {reducer, ActionType, ActionCreator} from "./reducer.js";
import offers from "./mocks/offers.js";

const testInitialState = {
  city: `Paris`,
  offers,
  sortType: `Popular`,
};

describe(`Reducer work properly`, () => {
  it(`Reducer should return initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});

    expect(initialReducer).toEqual(testInitialState);
  });

  it(`Reducer should change city with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`,
    })).toEqual({
      city: `Amsterdam`,
      offers,
      sortType: `Popular`,
    });
  });

  it(`Reducer should change sort type with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Top rated first`,
    })).toEqual({
      city: `Paris`,
      offers,
      sortType: `Top rated first`,
    });
  });
});

describe(`Action creators work properly`, () => {
  it(`Action creator changing city returns action with city in payload`, () => {
    expect(ActionCreator.changeCity(`Amsterdam`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`,
    });
  });

  it(`Action creator changing sort type returns action with sort type in payload`, () => {
    expect(ActionCreator.changeSortType(`Top rated first`)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Top rated first`,
    });
  });
});
