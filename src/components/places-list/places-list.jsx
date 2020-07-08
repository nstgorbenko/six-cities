import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {CardType} from "../../const.js";
import {getSortedPlaces} from "../../utils/sort.js";
import {offerType} from "../../types.js";
import PlaceCard from "../place-card/place-card.jsx";

const NEARBY_TO_SHOW = 3;

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeCard: null};

    this._handlePlaceCardHover = this._handlePlaceCardHover.bind(this);
  }

  render() {
    const {type, places, sortType, onPlaceCardNameClick} = this.props;

    const typeClassName = type === CardType.CITIES ? `${type}__places-list` : `${type}__list`;
    const shownPlaces = type === CardType.CITIES ? getSortedPlaces(places, sortType) : places.slice(0, NEARBY_TO_SHOW);

    return (
      <div className={`${typeClassName} places__list`}>
        {shownPlaces.map((place) =>
          <PlaceCard
            key={place.id}
            cardType={type}
            place={place}
            onNameClick={onPlaceCardNameClick}
            onHover={this._handlePlaceCardHover}
          />)}
      </div>
    );
  }

  _handlePlaceCardHover(id) {
    this.setState({activeCard: id});
  }
}

PlacesList.propTypes = {
  type: PropTypes.oneOf(Object.values(CardType)).isRequired,
  places: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  sortType: PropTypes.string.isRequired,
  onPlaceCardNameClick: PropTypes.func.isRequired
};

export default PlacesList;
