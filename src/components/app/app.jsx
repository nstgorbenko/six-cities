import PropTypes from "prop-types";
import React from "react";

import Main from "../main/main.jsx";

const App = (props) => {
  const {offersCount, offers} = props;

  return (
    <Main
      offersCount = {offersCount}
      offers = {offers}
      onPlaceCardNameClick = {() => {}}
    />
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default App;
