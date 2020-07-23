import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import {cityType, offerType, userType} from "../../types.js";
import Error from "../error/error.jsx";
import Login from "../login/login.jsx";
import Main from "../main/main.jsx";
import Offer from "../offer/offer.jsx";
import {ScreenType} from "../../const.js";
import {getActiveOffer, getCity, getScreen, getSortType} from "../../reducer/app/selectors.js";
import {getAuthorizationStatus, getUserInfo} from "../../reducer/user/selectors.js";
import {getCities, getCityOffers} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._renderApp = this._renderApp.bind(this);
  }

  _renderApp() {
    const {authorizationStatus, userInfo, city, cities, offers, sortType, screen, activeOffer, onCityChange, onScreenChange, onActiveOfferChange, login} = this.props;

    switch (screen) {
      case ScreenType.ERROR:
        return (
          <Error />
        );

      case ScreenType.LOGIN:
        return (
          <Login
            onSubmit={login}
          />
        );

      case ScreenType.DEFAULT:
        return (
          <Main
            authorizationStatus={authorizationStatus}
            userInfo={userInfo}
            activeCity={city}
            cities={cities}
            offers={offers}
            sortType={sortType}
            activeOffer={activeOffer}

            onPlaceCardNameClick={onScreenChange}
            onCityNameClick={onCityChange}
            onPlaceCardHover={onActiveOfferChange}
          />
        );

      case ScreenType.OFFER:
        const currentOffer = offers.find(({id}) => id === activeOffer);

        return (
          <Offer
            authorizationStatus={authorizationStatus}
            userInfo={userInfo}
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
    // const {offers, onScreenChange} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp}
          </Route>
          {/* <Route exact path="/offer">
            {offers.length && <Offer
              place={offers[0]}
              allPlaces={offers.slice(0, 4)}
              onPlaceCardNameClick={onScreenChange}
            />}
          </Route> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userInfo: PropTypes.shape(userType).isRequired,
  city: PropTypes.shape(cityType).isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape(cityType)).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  sortType: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  activeOffer: PropTypes.number.isRequired,
  onCityChange: PropTypes.func.isRequired,
  onScreenChange: PropTypes.func.isRequired,
  onActiveOfferChange: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userInfo: getUserInfo(state),
  city: getCity(state),
  cities: getCities(state),
  offers: getCityOffers(state),
  sortType: getSortType(state),
  screen: getScreen(state),
  activeOffer: getActiveOffer(state),
});

export const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData))
      .then(() => dispatch(AppActionCreator.changeScreenType(ScreenType.DEFAULT)));
  },
  onCityChange(city) {
    dispatch(AppActionCreator.changeCity(city));
  },
  onScreenChange(screenType, activeOfferId) {
    dispatch(AppActionCreator.changeActiveOffer(activeOfferId));
    dispatch(AppActionCreator.changeScreenType(screenType));
  },
  onActiveOfferChange(activeOfferId) {
    dispatch(AppActionCreator.changeActiveOffer(activeOfferId));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
