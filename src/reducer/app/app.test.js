import {ActionCreator, ActionType, reducer} from "./app.js";

const testInitialState = {
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
};

describe(`Reducer working test`, () => {
  it(`returns initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});

    expect(initialReducer).toEqual(testInitialState);
  });

  it(`changes city with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_CITY,
      payload: {
        name: `Amsterdam`,
        location: {
          coordinates: [55.5, 22.2],
          zoom: 10,
        }
      },
    })).toEqual({
      city: {
        name: `Amsterdam`,
        location: {
          coordinates: [55.5, 22.2],
          zoom: 10,
        }
      },
      sortType: `Popular`,
      screen: ``,
      activeOffer: 0,
    });
  });

  it(`changes sort type with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Top rated first`,
    })).toEqual({
      city: {
        name: ``,
        location: {
          coordinates: [0, 0],
          zoom: 0,
        }
      },
      sortType: `Top rated first`,
      screen: ``,
      activeOffer: 0,
    });
  });

  it(`changes screen type with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_SCREEN_TYPE,
      payload: `offer`,
    })).toEqual({
      city: {
        name: ``,
        location: {
          coordinates: [0, 0],
          zoom: 0,
        }
      },
      sortType: `Popular`,
      screen: `offer`,
      activeOffer: 0,
    });
  });

  it(`changes active offer with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: 100,
    })).toEqual({
      city: {
        name: ``,
        location: {
          coordinates: [0, 0],
          zoom: 0,
        }
      },
      sortType: `Popular`,
      screen: ``,
      activeOffer: 100,
    });
  });
});

describe(`Action creators working test`, () => {
  it(`returns action with city in payload`, () => {
    expect(ActionCreator.changeCity({
      name: `Amsterdam`,
      location: {
        coordinates: [55.5, 22.2],
        zoom: 10,
      }
    })).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: {
        name: `Amsterdam`,
        location: {
          coordinates: [55.5, 22.2],
          zoom: 10,
        }
      }
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
    expect(ActionCreator.changeActiveOffer(100)).toEqual({
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: 100,
    });
  });
});
