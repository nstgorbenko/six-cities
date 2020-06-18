import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import PlaceCard from "../place-card/place-card.jsx";

class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeCard: null};

    this._handlePlaceCardHover = this._handlePlaceCardHover.bind(this);
  }

  render() {
    const {places, onPlaceCardNameClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {places.map((place) =>
          <PlaceCard
            key={place.id}
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
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPlaceCardNameClick: PropTypes.func.isRequired
};

export default PlacesList;
