import App from "./components/app/app.jsx";
import React from "react";
import ReactDOM from "react-dom";

const OFFERS_COUNT = 170;

ReactDOM.render(
    <App
      offersCount = {OFFERS_COUNT}
    />,
    document.querySelector(`#root`)
);
