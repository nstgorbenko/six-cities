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
    this.state = {
      screen: ScreenType.DEFAULT,
      id: ``
    };

    this._handlePlaceCardNameClick = this._handlePlaceCardNameClick.bind(this);
    this._renderApp = this._renderApp.bind(this);
  }

  _handlePlaceCardNameClick(id) {
    this.setState({
      screen: ScreenType.OFFER,
      id
    });
  }

  _renderApp() {
    const {city, offers, sortType, onCityChange} = this.props;

    switch (this.state.screen) {
      case ScreenType.DEFAULT:
        return (
          <Main
            activeCity={city}
            cities={CITIES}
            offers={offers}
            sortType={sortType}

            onPlaceCardNameClick={this._handlePlaceCardNameClick}
            onCityNameClick={onCityChange}
          />
        );
      case ScreenType.OFFER:
        const currentOffer = offers.find(({id}) => id === this.state.id);

        return (
          <Offer
            place={currentOffer}
            allPlaces={offers}
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
              allPlaces={offers.slice(0, 4)}
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
  sortType: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: getCityOffers(state.city, state.offers),
  sortType: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
