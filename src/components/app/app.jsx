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
    const {city, offers, sortType, onCityChange, onSortTypeChange} = this.props;

    switch (this.state.screen) {
      case Screen.DEFAULT:
        return (
          <Main
            activeCity={city}
            cities={CITIES}
            offers={offers}
            sortType={sortType}

            onPlaceCardNameClick={this._handlePlaceCardNameClick}
            onCityNameClick={onCityChange}
            onSortTypeChange={onSortTypeChange}
          />
        );
      case Screen.OFFER:
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
  onSortTypeChange: PropTypes.func.isRequired,
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
  onSortTypeChange(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
