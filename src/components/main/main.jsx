import PropTypes from "prop-types";
import React from "react";

import {CardType, CityNameToCoords} from "../../const.js";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from '../map/map.jsx';
import NoPlaces from "../no-places/no-places.jsx";
import {offerType} from "../../types.js";
import PlacesList from "../places-list/places-list.jsx";
import Sort from "../sort/sort.jsx";
import withActiveFlag from "../../hocs/with-active-flag/with-active-flag.js";

const Main = (props) => {
  const {activeCity, cities, offers, sortType, activeOffer, onPlaceCardNameClick, onCityNameClick, onPlaceCardHover} = props;
  const SortWrapped = withActiveFlag(Sort);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
                <b className="places__found">{offers.length} places to stay in {activeCity}</b>
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
                    center={CityNameToCoords[activeCity]}
                    offers={offers}
                    activeOffer={activeOffer}
                  />
                </section>
              </div>
            </div>
            : <NoPlaces activeCity={activeCity}/>}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  activeCity: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  sortType: PropTypes.string.isRequired,
  activeOffer: PropTypes.string.isRequired,
  onPlaceCardNameClick: PropTypes.func.isRequired,
  onCityNameClick: PropTypes.func.isRequired,
  onPlaceCardHover: PropTypes.func.isRequired,
};

export default Main;
