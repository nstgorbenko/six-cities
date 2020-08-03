import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";

import App from "./components/app/app.jsx";
import {ActionCreator as AppActionCreator} from "./reducer/app/app.js";
import {AuthorizationStatus, ActionCreator as UserActionCreator, Operation as UserOperation} from "./reducer/user/user.js";
import createAPI from "./api.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {getFirstCity} from "./utils/common.js";
import reducer from "./reducer/reducer.js";
import {ScreenType} from "./const.js";

const onDataError = () => {
  store.dispatch(AppActionCreator.changeScreenType(ScreenType.ERROR));
};

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.updateAuthStatus(AuthorizationStatus.NO_AUTH));
  store.dispatch(AppActionCreator.changeScreenType(ScreenType.DEFAULT));
};

const api = createAPI(onDataError, onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadOffers())
  .then((offers) => store.dispatch(AppActionCreator.changeCity(getFirstCity(offers))))
  .then(() => store.dispatch(DataOperation.loadFavorites()))
  .then(() => store.dispatch(UserOperation.checkAuthStatus()))
  .then(() => store.dispatch(AppActionCreator.changeScreenType(ScreenType.DEFAULT)));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
