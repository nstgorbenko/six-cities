import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {ActionCreator} from "../../reducer.js";
import {CITIES, ScreenType} from "../../const.js";
import Main from "../main/main.jsx";
import Offer from "../offer/offer.jsx";
import {offerType} from "../../types.js";

const getCityOffers = (chosenCity, offers) => {
  return offers.filter(({city}) => city === chosenCity);
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._renderApp = this._renderApp.bind(this);
  }

  _renderApp() {
    const {city, offers, sortType, screen, activeOffer, onCityChange, onScreenChange} = this.props;

    switch (screen) {
      case ScreenType.DEFAULT:
        return (
          <Main
            activeCity={city}
            cities={CITIES}
            offers={offers}
            sortType={sortType}

            onPlaceCardNameClick={onScreenChange}
            onCityNameClick={onCityChange}
          />
        );
      case ScreenType.OFFER:
        const currentOffer = offers.find(({id}) => id === activeOffer);

        return (
          <Offer
            place={currentOffer}
            allPlaces={offers}
            onPlaceCardNameClick={onScreenChange}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {offers, onScreenChange} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp}
          </Route>
          <Route exact path="/offer">
            {offers.length && <Offer
              place={offers[0]}
              allPlaces={offers.slice(0, 4)}
              onPlaceCardNameClick={onScreenChange}
            />}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  sortType: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  activeOffer: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
  onScreenChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: getCityOffers(state.city, state.offers),
  sortType: state.sortType,
  screen: state.screen,
  activeOffer: state.activeOffer,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  onScreenChange(screenType, activeOffer) {
    dispatch(ActionCreator.changeActiveOffer(activeOffer));
    dispatch(ActionCreator.changeScreenType(screenType));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
