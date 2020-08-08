import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {cityType, offerType, reviewType} from "../../types.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import Error from "../error/error.jsx";
import Favorites from "../favorites/favorites.jsx";
import Login from "../login/login.jsx";
import Main from "../main/main.jsx";
import Offer from "../offer/offer.jsx";
import {AppRoute, ErrorMessage} from "../../const.js";
import {getActiveOffer, getCity, getSortType} from "../../reducer/app/selectors.js";
import {getAuthorizationStatus, getErrorStatus} from "../../reducer/user/selectors.js";
import {getCities, getCityOffers, getNearbyOffers, getOffers, getReviews} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import PrivateRoute from "../private-route/private-route.jsx";

const App = (props) => {
  const {activeOffer, allOffers, authorizationStatus, cities, city, cityOffers, errorStatus, nearbyOffers, reviews, sortType,
    onActiveOfferChange, onAddToFavorites, onCityChange, onLogin, onNearbyOffersLoad, onReviewsLoad} = props;

  if (allOffers.length === 0) {
    return (
      <Error
        text={ErrorMessage.FAIL_LOAD}
      />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main
            activeCity={city}
            activeOffer={activeOffer}
            cities={cities}
            offers={cityOffers}
            sortType={sortType}

            onCityNameClick={onCityChange}
            onPlaceCardHover={onActiveOfferChange}
          />
        </Route>

        <Route exact path={`${AppRoute.OFFER}/:id`}
          render={({match}) => {
            const id = Number(match.params.id);
            const currentOffer = allOffers.find((offer) => offer.id === id);

            return currentOffer
              ? <Offer
                authorizationStatus={authorizationStatus}
                nearbyOffers={nearbyOffers}
                place={currentOffer}
                reviews={reviews}

                onAddToFavorites={onAddToFavorites}
                onNearbyOffersLoad={onNearbyOffersLoad}
                onReviewsLoad={onReviewsLoad}
                onPlaceCardHover={onActiveOfferChange}
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
                return <Login onSubmit = {onLogin} error={errorStatus}/>;
              default:
                return null;
            }
          }}>
        </Route>

        <PrivateRoute exact path={AppRoute.FAVORITES}
          render={() => <Favorites onPlaceCardHover={onActiveOfferChange}/>}
        />

        <Route>
          <Error
            text={ErrorMessage.NOT_FOUND}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  activeOffer: PropTypes.number.isRequired,
  allOffers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape(cityType)).isRequired,
  city: PropTypes.shape(cityType).isRequired,
  cityOffers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  errorStatus: PropTypes.bool.isRequired,
  nearbyOffers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewType)).isRequired,
  sortType: PropTypes.string.isRequired,

  onActiveOfferChange: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onNearbyOffersLoad: PropTypes.func.isRequired,
  onReviewsLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeOffer: getActiveOffer(state),
  allOffers: getOffers(state),
  authorizationStatus: getAuthorizationStatus(state),
  cities: getCities(state),
  city: getCity(state),
  cityOffers: getCityOffers(state),
  errorStatus: getErrorStatus(state),
  nearbyOffers: getNearbyOffers(state),
  reviews: getReviews(state),
  sortType: getSortType(state),
});

export const mapDispatchToProps = (dispatch) => ({
  onActiveOfferChange(activeOfferId) {
    dispatch(AppActionCreator.changeActiveOffer(activeOfferId));
  },
  onAddToFavorites(favoriteData) {
    dispatch(DataOperation.addToFavorites(favoriteData));
  },
  onCityChange(city) {
    dispatch(AppActionCreator.changeCity(city));
  },
  onLogin(authData) {
    dispatch(UserOperation.login(authData))
      .then(() => dispatch(DataOperation.loadOffers()))
      .then(() => dispatch(DataOperation.loadFavorites()));
  },
  onNearbyOffersLoad(id) {
    dispatch(DataOperation.loadNearbyOffers(id));
  },
  onReviewsLoad(id) {
    dispatch(DataOperation.loadReviews(id));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
