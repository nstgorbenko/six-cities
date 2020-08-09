import * as React from 'react';

import {CardType} from "../../const";
import CitiesList from "../cities-list/cities-list";
import Header from "../header/header";
import Map from '../map/map';
import NoPlaces from "../no-places/no-places";
import {CityType, OfferType} from "../../types";
import PlacesList from "../places-list/places-list";
import Sort from "../sort/sort";
import withActiveFlag from "../../hocs/with-active-flag/with-active-flag";

interface Props {
  activeCity: CityType;
  cities: Array<CityType>;
  offers: Array<OfferType>;
  sortType: string;
  activeOffer: number;
  onPlaceCardHover(cardId: number): void;
  onCityNameClick(city: CityType): void;
}

const Main: React.FC<Props> = (props: Props) => {
  const {activeCity, cities, offers, sortType, activeOffer, onPlaceCardHover, onCityNameClick} = props;
  const {name: cityName, location: cityLocation} = activeCity;

  const SortWrapped = withActiveFlag(Sort);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index ${offers.length === 0 ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          activeCity={activeCity}
          cities={cities}
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

export default Main;
