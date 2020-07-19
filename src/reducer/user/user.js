const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const ActionType = {
  UPDATE_AUTH_STATUS: `UPDATE_AUTH_STATUS`,
};

const ActionCreator = {
  updateAuthStatus: (status) => ({
    type: ActionType.UPDATE_AUTH_STATUS,
    payload: status
  }),
};

const Operation = {
  checkAuthStatus: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.updateAuthStatus(AuthorizationStatus.AUTH));
      })
      .catch((error) => {
        throw error;
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then(() => {
      dispatch(ActionCreator.updateAuthStatus(AuthorizationStatus.AUTH));
    })
    .catch((error) => {
      throw error;
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (ActionType.UPDATE_AUTH_STATUS) :
      return Object.assign({}, state, {
        authorizationStatus: action.payload
      });
  }
  return state;
};

export {ActionCreator, ActionType, AuthorizationStatus, Operation, reducer};
