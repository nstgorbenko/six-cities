import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {ActionCreator} from "../../reducer.js";
import {CITIES} from "../../const.js";
import Main from "../main/main.jsx";
import Offer from "../offer/offer.jsx";
import {offerType} from "../../types.js";

const getCityOffers = (chosenCity, offers) => {
  return offers.filter(({city}) => city === chosenCity);
};

const Screen = {
  DEFAULT: `default`,
  OFFER: `offer`
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screen: Screen.DEFAULT,
      id: ``
    };

    this._handlePlaceCardNameClick = this._handlePlaceCardNameClick.bind(this);
    this._renderApp = this._renderApp.bind(this);
  }

  _handlePlaceCardNameClick(id) {
    this.setState({
      screen: `offer`,
      id
    });
  }

  _renderApp() {
    const {city, offers, onCityChange} = this.props;

    switch (this.state.screen) {
      case Screen.DEFAULT:
        return (
          <Main
            activeCity={city}
            cities={CITIES}
            offers={offers}
            onPlaceCardNameClick={this._handlePlaceCardNameClick}
            onCityNameClick={onCityChange}
          />
        );
      case Screen.OFFER:
        const offerIndex = offers.findIndex(({id}) => id === this.state.id);
        const nearbyPlaces = [...offers.slice(0, offerIndex), ...offers.slice(offerIndex + 1)];

        return (
          <Offer
            place={offers[offerIndex]}
            nearbyPlaces={nearbyPlaces}
            onPlaceCardNameClick={this._handlePlaceCardNameClick}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp}
          </Route>
          <Route exact path="/offer">
            {offers.length && <Offer
              place={offers[0]}
              nearbyPlaces={offers.slice(1, 4)}
              onPlaceCardNameClick={this._handlePlaceCardNameClick}
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
  onCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: getCityOffers(state.city, state.offers),
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
