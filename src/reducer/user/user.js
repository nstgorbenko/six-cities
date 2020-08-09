import {adaptUserInfo} from "../../utils/adapter";

const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`,
};

const initialState = {
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

const ActionType = {
  UPDATE_AUTH_STATUS: `UPDATE_AUTH_STATUS`,
  SET_INFO: `SET_INFO`,
  SET_ERROR: `SET_ERROR`,
};

const ActionCreator = {
  updateAuthStatus: (status) => ({
    type: ActionType.UPDATE_AUTH_STATUS,
    payload: status
  }),
  setInfo: (info) => ({
    type: ActionType.SET_INFO,
    payload: info
  }),
  setError: (state) => ({
    type: ActionType.SET_ERROR,
    payload: state
  }),
};

const Operation = {
  checkAuthStatus: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(({data}) => {
        dispatch(ActionCreator.updateAuthStatus(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setInfo(adaptUserInfo(data)));
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then(({data}) => {
      dispatch(ActionCreator.updateAuthStatus(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.setInfo(adaptUserInfo(data)));
      dispatch(ActionCreator.setError(false));
    })
    .catch((error) => {
      if (error.response.status === 400) {
        dispatch(ActionCreator.setError(true));
      }
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (ActionType.UPDATE_AUTH_STATUS) :
      return Object.assign({}, state, {
        authorizationStatus: action.payload
      });
    case (ActionType.SET_INFO) :
      return Object.assign({}, state, {
        info: action.payload
      });
    case (ActionType.SET_ERROR) :
      return Object.assign({}, state, {
        isError: action.payload
      });
  }
  return state;
};

export {ActionCreator, ActionType, AuthorizationStatus, Operation, reducer};
