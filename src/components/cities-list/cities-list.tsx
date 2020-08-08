import PropTypes from "prop-types";
import React from "react";

import {cityType} from "../../types.js";

const CitiesList = (props) => {
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

CitiesList.propTypes = {
  activeCity: PropTypes.shape(cityType).isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape(cityType)).isRequired,
  onCityNameClick: PropTypes.func.isRequired,
};

export default CitiesList;
