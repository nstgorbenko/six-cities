import PropTypes from "prop-types";
import React from "react";

import {OFFER_TYPES} from "../../const.js";
import {capitalizeWord, getRatingPercent} from "../../utils.js";

const FAVORITE_CLASS = `place-card__bookmark-button--active`;

const PlaceCard = (props) => {
  const {place, onNameClick, onHover} = props;
  const {id, name, type, price, photo, rating, isPremium, isFavorite} = place;

  const ratingPercent = getRatingPercent(rating);
  const placeType = capitalizeWord(type);

  return (
    <article className="cities__place-card place-card"
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={photo} width="260" height="200" alt={name}/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? FAVORITE_CLASS : ``} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a
            href="#"
            onClick={onNameClick}
          >{name}</a>
        </h2>
        <p className="place-card__type">{placeType}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(OFFER_TYPES).isRequired,
    price: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  onNameClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
};

export default PlaceCard;
