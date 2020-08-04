import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute, CardType, ScreenType} from "../../const.js";
import {capitalizeWord, getRatingPercent} from "../../utils/common.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {offerType} from "../../types.js";

const FAVORITE_CLASS = `place-card__bookmark-button--active`;
const ImageSize = {
  DEFAULT: {
    width: 260,
    height: 200
  },
  FAVORITES: {
    width: 150,
    height: 110
  }
};

const PlaceCard = (props) => {
  const {authorizationStatus, cardType, place, onNameClick, onHover, addToFavorites} = props;
  const {id, name, type, price, photo, rating, isPremium, isFavorite} = place;

  const ratingPercent = getRatingPercent(rating);
  const placeType = capitalizeWord(type);

  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;
  const bookmarkActiveClass = isFavorite && FAVORITE_CLASS;
  const bookmarkName = `${isFavorite ? `In` : `To`} bookmarks`;

  const articleClassName = cardType === CardType.CITIES ? `${cardType}__place-card` : `${cardType}__card`;
  const imageSize = cardType === CardType.FAVORITES ? ImageSize.FAVORITES : ImageSize.DEFAULT;
  const isCardMark = cardType === CardType.CITIES && isPremium;

  return (
    <article className={`${articleClassName} place-card`}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(0)}
    >
      {isCardMark &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={photo} width={imageSize.width} height={imageSize.height} alt={name}/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {isAuth && <button className={`place-card__bookmark-button ${bookmarkActiveClass} button`} type="button"
            onClick={() => addToFavorites({
              hotelId: id,
              status: Number(!isFavorite),
            })}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{bookmarkName}</span>
          </button>}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`${AppRoute.OFFER}/${id}`}
            onClick={() => onNameClick(ScreenType.OFFER, id)}
          >{name}</Link>
        </h2>
        <p className="place-card__type">{placeType}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  cardType: PropTypes.oneOf(Object.values(CardType)).isRequired,
  place: PropTypes.shape(offerType).isRequired,
  onNameClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export const mapDispatchToProps = (dispatch) => ({
  addToFavorites(favoriteData) {
    dispatch(DataOperation.addToFavorites(favoriteData));
  },
});

export {PlaceCard};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
