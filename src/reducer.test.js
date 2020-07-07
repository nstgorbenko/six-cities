import {reducer, ActionType, ActionCreator} from "./reducer.js";
import offers from "./mocks/offers.js";

const testInitialState = {
  city: `Paris`,
  offers,
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
});
