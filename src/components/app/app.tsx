import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import * as React from 'react';

import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {AuthorizationStatus} from "../../reducer/user/user";
import {CityType, OfferType, ReviewType} from "../../types";
import {Operation as DataOperation} from "../../reducer/data/data";
import Error from "../error/error";
import Favorites from "../favorites/favorites";
import Login from "../login/login";
import Main from "../main/main";
import Offer from "../offer/offer";
import {AppRoute, ErrorMessage} from "../../const";
import {getActiveOffer, getCity, getSortType} from "../../reducer/app/selectors";
import {getAuthorizationStatus, getErrorStatus} from "../../reducer/user/selectors";
import {getCities, getCityOffers, getNearbyOffers, getOffers, getReviews} from "../../reducer/data/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import PrivateRoute from "../private-route/private-route";

interface Props {
  activeOffer: number;
  allOffers: Array<OfferType>;
  authorizationStatus: string;
  cities: Array<CityType>;
  city: CityType;
  cityOffers: Array<OfferType>;
  errorStatus: boolean;
  nearbyOffers: Array<OfferType>;
  reviews: Array<ReviewType>;
  sortType: string;

  onActiveOfferChange(cardId: number): void;
  onAddToFavorites(hotelData: {
    hotelId: number;
    status: number;
  }): void;
  onCityChange(city: CityType): void;
  onLogin(userData: {
    login: string;
    password: string;
  }): void;
  onNearbyOffersLoad(hotelId: number): void;
  onReviewsLoad(hotelId: number): void;
}

const App: React.FC<Props> = (props: Props) => {
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
    <HashRouter>
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
            const currentOffer: OfferType = allOffers.find((offer) => offer.id === id);

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
    </HashRouter>
  );
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
