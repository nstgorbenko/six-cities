import PropTypes from "prop-types";
import React from "react";

const CitiesList = (props) => {
  const {activeCity, cities, onCityNameClick} = props;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) =>
            <li key={city} className="locations__item">
              <a className={`locations__item-link tabs__item ${city === activeCity ? `tabs__item--active` : ``}`} href="#"
                onClick={() => onCityNameClick(city)}
              >
                <span>{city}</span>
              </a>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
};

CitiesList.propTypes = {
  activeCity: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCityNameClick: PropTypes.func.isRequired,
};

export default CitiesList;
