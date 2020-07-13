import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";

import App from "./components/app/app.jsx";
import createAPI from "./api.js";
import {reducer} from "./reducer.js";

const api = createAPI(() => {});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)))
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
