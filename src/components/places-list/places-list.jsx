import PropTypes from "prop-types";
import React from "react";

import {CardType} from "../../const.js";
import {getSortedPlaces} from "../../utils/sort.js";
import {offerType} from "../../types.js";
import PlaceCard from "../place-card/place-card.jsx";

const PlacesList = (props) => {
  const {type, places, sortType, onPlaceCardNameClick, onPlaceCardHover} = props;

  const typeClassName = type === CardType.CITIES ? `${type}__places-list` : `${type}__list`;
  const shownPlaces = type === CardType.CITIES ? getSortedPlaces(places, sortType) : places;

  return (
    <div className={`${typeClassName} places__list`}>
      {shownPlaces.map((place) =>
        <PlaceCard
          key={place.id}
          cardType={type}
          place={place}
          onNameClick={onPlaceCardNameClick}
          onHover={onPlaceCardHover}
        />)}
    </div>
  );
};

PlacesList.propTypes = {
  type: PropTypes.oneOf(Object.values(CardType)).isRequired,
  places: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  sortType: PropTypes.string.isRequired,
  onPlaceCardNameClick: PropTypes.func.isRequired,
  onPlaceCardHover: PropTypes.func.isRequired,
};

export default PlacesList;
