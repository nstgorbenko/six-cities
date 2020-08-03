import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {cityType, offerType} from "../../types.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import Error from "../error/error.jsx";
import Favorites from "../favorites/favorites.jsx";
import Login from "../login/login.jsx";
import Main from "../main/main.jsx";
import Offer from "../offer/offer.jsx";
import {AppRoute, ScreenType} from "../../const.js";
import {getActiveOffer, getCity, getScreen, getSortType} from "../../reducer/app/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getCities, getCityOffers} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import PrivateRoute from "../private-route/private-route.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._renderApp = this._renderApp.bind(this);
  }

  _renderApp() {
    const {authorizationStatus, city, cities, offers, sortType, screen, activeOffer, onCityChange, onScreenChange, onActiveOfferChange, addToFavorites} = this.props;

    switch (screen) {
      case ScreenType.ERROR:
        return (
          <Error />
        );

      case ScreenType.LOGIN:
        return <Redirect to={AppRoute.LOGIN}/>;

      case ScreenType.DEFAULT:
        return (
          <Main
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

      case ScreenType.FAVORITES:
        return <Redirect to={AppRoute.FAVORITES}/>;

      case ScreenType.OFFER:
        const currentOffer = offers.find(({id}) => id === activeOffer);

        return (
          <Offer
            authorizationStatus={authorizationStatus}
            place={currentOffer}
            allPlaces={offers}
            onPlaceCardNameClick={onScreenChange}
            addToFavorites={addToFavorites}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {authorizationStatus, login} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={AppRoute.MAIN}>
            {this._renderApp}
          </Route>

          <Route exact path={AppRoute.LOGIN}
            render={() => {
              switch (authorizationStatus) {
                case AuthorizationStatus.AUTH:
                  return <Redirect to={AppRoute.MAIN} />;
                case AuthorizationStatus.NO_AUTH:
                  return <Login onSubmit = {login} />;
                default:
                  return null;
              }
            }}>
          </Route>

          <PrivateRoute exact path={AppRoute.FAVORITES}
            render={() => <Favorites />}
          />

          <Route>
            <Error />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  city: PropTypes.shape(cityType).isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape(cityType)).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  sortType: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  activeOffer: PropTypes.number.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
  onScreenChange: PropTypes.func.isRequired,
  onActiveOfferChange: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  city: getCity(state),
  cities: getCities(state),
  offers: getCityOffers(state),
  sortType: getSortType(state),
  screen: getScreen(state),
  activeOffer: getActiveOffer(state),
});

export const mapDispatchToProps = (dispatch) => ({
  addToFavorites(favoriteData) {
    dispatch(DataOperation.addToFavorites(favoriteData));
  },
  login(authData) {
    dispatch(UserOperation.login(authData))
      .then(() => dispatch(DataOperation.loadOffers()))
      .then(() => dispatch(DataOperation.loadFavorites()));
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
