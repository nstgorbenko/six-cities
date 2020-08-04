import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {cityType, offerType, reviewType} from "../../types.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import Error from "../error/error.jsx";
import Favorites from "../favorites/favorites.jsx";
import Login from "../login/login.jsx";
import Main from "../main/main.jsx";
import Offer from "../offer/offer.jsx";
import {AppRoute, ErrorMessage, ScreenType} from "../../const.js";
import {getActiveOffer, getCity, getScreen, getSortType} from "../../reducer/app/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getCities, getCityOffers, getOffers, getReviews} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import PrivateRoute from "../private-route/private-route.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._renderApp = this._renderApp.bind(this);
  }

  _renderApp() {
    const {activeOffer, cities, city, cityOffers, screen, sortType, onActiveOfferChange, onCityChange, onScreenChange} = this.props;

    switch (screen) {
      case ScreenType.ERROR:
        return (
          <Error
            text={ErrorMessage.FAIL_LOAD}
          />
        );

      case ScreenType.LOGIN:
        return <Redirect to={AppRoute.LOGIN}/>;

      case ScreenType.DEFAULT:
        return (
          <Main
            activeCity={city}
            cities={cities}
            offers={cityOffers}
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
        return <Redirect to={`${AppRoute.OFFER}/${activeOffer}`}/>;

      default:
        return null;
    }
  }

  render() {
    const {allOffers, authorizationStatus, cityOffers, reviews, addToFavorites, loadReviews, login, onScreenChange} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={AppRoute.MAIN}>
            {this._renderApp}
          </Route>

          <Route exact path={`${AppRoute.OFFER}/:id`}
            render={(props) => {
              const id = Number(props.match.params.id);
              const currentOffer = allOffers.find((offer) => offer.id === id);

              return currentOffer
                ? <Offer
                  authorizationStatus={authorizationStatus}
                  place={currentOffer}
                  allPlaces={cityOffers}
                  onPlaceCardNameClick={onScreenChange}
                  addToFavorites={addToFavorites}
                  loadReviews={loadReviews}
                  reviews={reviews}
                />
                : <Error
                  text={ErrorMessage.NOT_FOUND}
                />;
            }}>
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
            <Error
              text={ErrorMessage.NOT_FOUND}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  activeOffer: PropTypes.number.isRequired,
  allOffers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape(cityType)).isRequired,
  city: PropTypes.shape(cityType).isRequired,
  cityOffers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewType)).isRequired,
  screen: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,

  addToFavorites: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  onActiveOfferChange: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
  onScreenChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeOffer: getActiveOffer(state),
  allOffers: getOffers(state),
  authorizationStatus: getAuthorizationStatus(state),
  cities: getCities(state),
  city: getCity(state),
  cityOffers: getCityOffers(state),
  reviews: getReviews(state),
  screen: getScreen(state),
  sortType: getSortType(state),
});

export const mapDispatchToProps = (dispatch) => ({
  addToFavorites(favoriteData) {
    dispatch(DataOperation.addToFavorites(favoriteData));
  },
  loadReviews(id) {
    dispatch(DataOperation.loadReviews(id));
  },
  login(authData) {
    dispatch(UserOperation.login(authData))
      .then(() => dispatch(DataOperation.loadOffers()))
      .then(() => dispatch(DataOperation.loadFavorites()));
  },
  onActiveOfferChange(activeOfferId) {
    dispatch(AppActionCreator.changeActiveOffer(activeOfferId));
  },
  onCityChange(city) {
    dispatch(AppActionCreator.changeCity(city));
  },
  onScreenChange(screenType, activeOfferId) {
    dispatch(AppActionCreator.changeActiveOffer(activeOfferId));
    dispatch(AppActionCreator.changeScreenType(screenType));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
