import PropTypes from "prop-types";
import React from "react";

import {CardType} from "../../const.js";
import CitiesList from "../cities-list/cities-list.jsx";
import Header from "../header/header.jsx";
import Map from '../map/map.jsx';
import NoPlaces from "../no-places/no-places.jsx";
import {cityType, offerType, userType} from "../../types.js";
import PlacesList from "../places-list/places-list.jsx";
import Sort from "../sort/sort.jsx";
import withActiveFlag from "../../hocs/with-active-flag/with-active-flag.js";

const Main = (props) => {
  const {authorizationStatus, userInfo, activeCity, cities, offers, sortType, activeOffer, onPlaceCardNameClick, onCityNameClick, onPlaceCardHover} = props;
  const {name: cityName, location: cityLocation} = activeCity;

  const SortWrapped = withActiveFlag(Sort);

  return (
    <div className="page page--gray page--main">
      <Header
        authorizationStatus={authorizationStatus}
        userInfo={userInfo}
      />

      <main className={`page__main page__main--index ${offers.length === 0 ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          activeCity={activeCity}
          cities={cities}
          sortType={sortType}
          onCityNameClick={onCityNameClick}
        />
        <div className="cities">
          {offers.length > 0
            ? <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {cityName}</b>
                <SortWrapped />
                <PlacesList
                  type={CardType.CITIES}
                  places={offers}
                  sortType={sortType}
                  onPlaceCardNameClick={onPlaceCardNameClick}
                  onPlaceCardHover={onPlaceCardHover}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    center={cityLocation}
                    offers={offers}
                    activeOffer={activeOffer}
                  />
                </section>
              </div>
            </div>
            : <NoPlaces activeCity={cityName}/>}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userInfo: PropTypes.shape(userType).isRequired,
  activeCity: PropTypes.shape(cityType).isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape(cityType)).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  sortType: PropTypes.string.isRequired,
  activeOffer: PropTypes.number.isRequired,
  onPlaceCardNameClick: PropTypes.func.isRequired,
  onCityNameClick: PropTypes.func.isRequired,
  onPlaceCardHover: PropTypes.func.isRequired,
};

export default Main;
