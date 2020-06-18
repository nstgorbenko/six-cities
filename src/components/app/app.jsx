import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import Main from "../main/main.jsx";
import Property from "../property/property.jsx";

const App = (props) => {
  const {offersCount, offers} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            offersCount = {offersCount}
            offers = {offers}
            onPlaceCardNameClick = {() => {}}
          />
        </Route>
        <Route exact path="/property">
          <Property/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default App;
