import PropTypes from "prop-types";
import React from "react";

import {CardType} from "../../const.js";
import {capitalizeWord, getRatingPercent} from "../../utils/common.js";
import {offerType} from "../../types.js";

const FAVORITE_CLASS = `place-card__bookmark-button--active`;

const PlaceCard = (props) => {
  const {cardType, place, onNameClick, onHover} = props;
  const {id, name, type, price, photo, rating, isPremium, isFavorite} = place;

  const ratingPercent = getRatingPercent(rating);
  const placeType = capitalizeWord(type);

  const bookmarkActiveClass = isFavorite && FAVORITE_CLASS;
  const bookmarkName = `${isFavorite ? `In` : `To`} bookmarks`;

  const articleClassName = cardType === CardType.CITIES ? `${cardType}__place-card` : `${cardType}__card`;
  const isCardMark = cardType === CardType.CITIES && isPremium;

  return (
    <article className={`${articleClassName} place-card`}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(``)}
    >
      {isCardMark &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
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
          <button className={`place-card__bookmark-button ${bookmarkActiveClass} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{bookmarkName}</span>
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
            onClick={() => onNameClick(id)}
          >{name}</a>
        </h2>
        <p className="place-card__type">{placeType}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  cardType: PropTypes.oneOf(Object.values(CardType)).isRequired,
  place: PropTypes.shape(offerType).isRequired,
  onNameClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
};

export default PlaceCard;
