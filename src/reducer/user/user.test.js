import {ActionCreator, ActionType, Operation, reducer} from "./user";
import createAPI from "../../api";
import {getAuthorizationStatus, getUserInfo, getErrorStatus} from "./selectors";
import {noop} from "../../utils/common";

import MockAdapter from "axios-mock-adapter";

const testInitialState = {
  authorizationStatus: ``,
  info: {
    id: 0,
    name: ``,
    email: ``,
    avatar: ``,
    isSuper: true,
  },
  isError: false
};

const testStore = {
  APP: {},
  DATA: {},
  USER: testInitialState
};

const testAuthData = {
  login: `Oliver.conner@gmail.com`,
  password: 111111,
};

const testUserInfo = {
  id: 1,
  name: `Oliver.conner`,
  email: `Oliver.conner@gmail.com`,
  avatar: undefined,
  isSuper: undefined,
};

const api = createAPI(noop);
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
      info: {
        id: 0,
        name: ``,
        email: ``,
        avatar: ``,
        isSuper: true,
      },
      isError: false
    });
  });

  it(`updates user info with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.SET_INFO,
      payload: {
        id: 1,
        name: `Oliver.conner`,
        email: `Oliver.conner@gmail.com`,
        avatar: `img/1.png`,
        isSuper: false,
      },
    })).toEqual({
      authorizationStatus: ``,
      info: {
        id: 1,
        name: `Oliver.conner`,
        email: `Oliver.conner@gmail.com`,
        avatar: `img/1.png`,
        isSuper: false,
      },
      isError: false
    });
  });

  it(`updates isError with given value`, () => {
    expect(reducer(testInitialState, {
      type: ActionType.SET_ERROR,
      payload: true,
    })).toEqual({
      authorizationStatus: ``,
      info: {
        id: 0,
        name: ``,
        email: ``,
        avatar: ``,
        isSuper: true,
      },
      isError: true
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

  it(`returns action with user info in payload`, () => {
    expect(ActionCreator.setInfo({
      id: 1,
      name: `Oliver.conner`,
      email: `Oliver.conner@gmail.com`,
      avatar: `img/1.png`,
      isSuper: false,
    })).toEqual({
      type: ActionType.SET_INFO,
      payload: {
        id: 1,
        name: `Oliver.conner`,
        email: `Oliver.conner@gmail.com`,
        avatar: `img/1.png`,
        isSuper: false,
      },
    });
  });

  it(`returns action with error status in payload`, () => {
    expect(ActionCreator.setError(true)).toEqual({
      type: ActionType.SET_ERROR,
      payload: true,
    });
  });
});

describe(`Operation working test`, () => {
  it(`makes a correct API GET call to /login`, () => {
    const dispatch = jest.fn();
    const authorizationChecker = Operation.checkAuthStatus();

    apiMock
      .onGet(`/login`)
      .reply(200, testUserInfo);

    return authorizationChecker(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_AUTH_STATUS,
          payload: `AUTH`,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_INFO,
          payload: testUserInfo,
        });
      });
  });

  it(`makes a correct API POST call to /login`, () => {
    const dispatch = jest.fn();
    const authorization = Operation.login(testAuthData);

    apiMock
      .onPost(`/login`)
      .reply(200, testUserInfo);

    return authorization(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_AUTH_STATUS,
          payload: `AUTH`,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_INFO,
          payload: testUserInfo,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_ERROR,
          payload: false,
        });
      });
  });
});

describe(`Selectors working test`, () => {
  it(`returns authorization status value`, () => {
    expect(getAuthorizationStatus(testStore)).toEqual(``);
  });

  it(`returns user info value`, () => {
    expect(getUserInfo(testStore)).toEqual({
      id: 0,
      name: ``,
      email: ``,
      avatar: ``,
      isSuper: true,
    });
  });

  it(`returns error status value`, () => {
    expect(getErrorStatus(testStore)).toEqual(false);
  });
});
