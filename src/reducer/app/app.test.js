import {ActionCreator, ActionType, reducer} from "./app";
import {getActiveOffer, getCity, getSortType} from "./selectors";

const testInitialState = {
  city: {
    name: ``,
    location: {
      coordinates: [0, 0],
      zoom: 0,
    }
  },
  sortType: `Popular`,
  activeOffer: 0,
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
    activeOffer: 10,
  },
  DATA: {
    offers: []
  },
  USER: {
    authorizationStatus: `NO_AUTH`
  }
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

  it(`returns action with offer id in payload`, () => {
    expect(ActionCreator.changeActiveOffer(100)).toEqual({
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: 100,
    });
  });
});

describe(`Selectors working test`, () => {
  it(`returns active offer value`, () => {
    expect(getActiveOffer(testStore)).toEqual(10);
  });

  it(`returns city value`, () => {
    expect(getCity(testStore)).toEqual({
      name: `Amsterdam`,
      location: {
        coordinates: [55.5, 22.2],
        zoom: 10,
      }
    });
  });

  it(`returns sort type value`, () => {
    expect(getSortType(testStore)).toEqual(`Top rated first`);
  });
});
