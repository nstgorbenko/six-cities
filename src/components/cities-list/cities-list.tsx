import * as React from 'react';

import {CityType} from "../../types";

interface Props {
  activeCity: CityType;
  cities: Array<CityType>;
  onCityNameClick(city: CityType): void;
}

const CitiesList: React.FC<Props> = (props: Props) => {
  const {activeCity, cities, onCityNameClick} = props;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) =>
            <li key={city.name} className="locations__item">
              <a className={`locations__item-link tabs__item ${city.name === activeCity.name ? `tabs__item--active` : ``}`} href="#"
                onClick={() => onCityNameClick(city)}
              >
                <span>{city.name}</span>
              </a>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default CitiesList;
