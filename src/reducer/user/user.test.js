import {ActionCreator, ActionType, Operation, reducer} from "./user.js";
import createAPI from "../../api.js";
import {getAuthorizationStatus} from "./selectors.js";

import MockAdapter from "axios-mock-adapter";

const testInitialState = {
  authorizationStatus: `NO_AUTH`
};

const testStore = {
  APP: {},
  DATA: {},
  USER: {
    authorizationStatus: `NO_AUTH`,
  }
};

const testAuthData = {
  login: `user@yandex.ru`,
  password: 111111,
};

const api = createAPI(() => {});
const apiMock = new MockAdapter(api);

describe(`Reducer working test`, () => {
  it(`returns initial state without additional parameters`, () => {
    const initialReducer = reducer(undefined, {});

    expect(initialReducer).toEqual(testInitialState);
  });

  it(`updates authorization status with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.UPDATE_AUTH_STATUS,
      payload: `AUTH`,
    })).toEqual({
      authorizationStatus: `AUTH`,
    });
  });
});

describe(`Action creators working test`, () => {
  it(`returns action with authorization status in payload`, () => {
    expect(ActionCreator.updateAuthStatus(`AUTH`)).toEqual({
      type: ActionType.UPDATE_AUTH_STATUS,
      payload: `AUTH`,
    });
  });
});

describe(`Operation working test`, () => {
  it(`makes a correct API GET call to /login`, () => {
    const dispatch = jest.fn();
    const authorizationChecker = Operation.checkAuthStatus();

    apiMock
      .onGet(`/login`)
      .reply(200);

    return authorizationChecker(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.UPDATE_AUTH_STATUS,
          payload: `AUTH`,
        });
      });
  });

  it(`makes a correct API POST call to /login`, () => {
    const dispatch = jest.fn();
    const authorization = Operation.login(testAuthData);

    apiMock
      .onPost(`/login`)
      .reply(200);

    return authorization(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.UPDATE_AUTH_STATUS,
          payload: `AUTH`,
        });
      });
  });
});

describe(`Selectors working test`, () => {
  it(`returns authorization status value`, () => {
    expect(getAuthorizationStatus(testStore)).toEqual(`NO_AUTH`);
  });
});
