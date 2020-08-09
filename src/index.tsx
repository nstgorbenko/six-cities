import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import * as React from "react";
import * as ReactDOM from "react-dom";
import thunk from "redux-thunk";

import App from "./components/app/app";
import {ActionCreator as AppActionCreator} from "./reducer/app/app";
import {AuthorizationStatus, ActionCreator as UserActionCreator, Operation as UserOperation} from "./reducer/user/user";
import createAPI from "./api";
import {Operation as DataOperation} from "./reducer/data/data";
import {getFirstCity} from "./utils/common";
import reducer from "./reducer/reducer";

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.updateAuthStatus(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)))
);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
};

store.dispatch(DataOperation.loadOffers())
  .then((offers) => store.dispatch(AppActionCreator.changeCity(getFirstCity(offers))))
  .then(() => store.dispatch(UserOperation.checkAuthStatus()))
  .then(() => store.dispatch(DataOperation.loadFavorites()))
  .finally(() => init());

