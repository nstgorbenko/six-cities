import App from "./components/app/app.jsx";
import React from "react";
import ReactDOM from "react-dom";

const OFFERS_COUNT = 170;
const OFFERS_NAMES = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`
];

ReactDOM.render(
    <App
      offersCount = {OFFERS_COUNT}
      offersNames = {OFFERS_NAMES}
    />,
    document.querySelector(`#root`)
);
