import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";

import App from "./components/app/app.jsx";
import createAPI from "./api.js";
import {ActionCreator, reducer, Operation as DataOperation} from "./reducer.js";
import {ScreenType} from "./const.js";
import {getFirstCity} from "./utils/common.js";

const api = createAPI(() => {});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadOffers())
  .then((offers) => store.dispatch(ActionCreator.changeCity(getFirstCity(offers))))
  .then(() => store.dispatch(ActionCreator.changeScreenType(ScreenType.DEFAULT)));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
