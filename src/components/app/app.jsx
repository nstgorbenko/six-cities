import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import Main from "../main/main.jsx";
import Offer from "../offer/offer.jsx";

const App = (props) => {
  const {offers} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            offers={offers}
            onPlaceCardNameClick={() => {}}
          />
        </Route>
        <Route exact path="/offer">
          <Offer
            place={offers[0]}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default App;
