import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";
import offers from "./mocks/offers.js";

const OFFERS_COUNT = 170;

ReactDOM.render(
    <App
      offersCount = {OFFERS_COUNT}
      offers = {offers}
    />,
    document.querySelector(`#root`)
);
