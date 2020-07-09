import {reducer, ActionType, ActionCreator} from "./reducer.js";
import offers from "./mocks/offers.js";

const testInitialState = {
  city: `Paris`,
  offers,
  sortType: `Popular`,
  screen: `default`,
  activeOffer: ``,
};

describe(`Reducer work properly`, () => {
  it(`returns initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});

    expect(initialReducer).toEqual(testInitialState);
  });

  it(`change city with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`,
    })).toEqual({
      city: `Amsterdam`,
      offers,
      sortType: `Popular`,
      screen: `default`,
      activeOffer: ``,
    });
  });

  it(`change sort type with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Top rated first`,
    })).toEqual({
      city: `Paris`,
      offers,
      sortType: `Top rated first`,
      screen: `default`,
      activeOffer: ``,
    });
  });
});

describe(`Action creators work properly`, () => {
  it(`returns action with city in payload`, () => {
    expect(ActionCreator.changeCity(`Amsterdam`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`,
    });
  });

  it(`returns action with sort type in payload`, () => {
    expect(ActionCreator.changeSortType(`Top rated first`)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Top rated first`,
    });
  });

  it(`returns action with offer id in payload`, () => {
    expect(ActionCreator.changeActiveOffer(`101`)).toEqual({
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: `101`,
    });
  });

  it(`returns action with screen type in payload`, () => {
    expect(ActionCreator.changeScreenType(`OFFER`)).toEqual({
      type: ActionType.CHANGE_SCREEN_TYPE,
      payload: `OFFER`,
    });
  });
});
