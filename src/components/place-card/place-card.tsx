import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as React from 'react';

import {AuthorizationStatus} from "../../reducer/user/user";
import {AppRoute, CardType, ImageSize} from "../../const";
import {capitalizeWord, getRatingPercent} from "../../utils/common";
import {Operation as DataOperation} from "../../reducer/data/data";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {OfferType} from "../../types";

interface Props {
  authorizationStatus: string;
  cardType: CardType;
  place: OfferType;
  onHover(cardId: number): void;
  onAddToFavorites(hotelData: {
    hotelId: number;
    status: number;
  }): void;
}

const PlaceCard: React.FC<Props> = (props: Props) => {
  const {authorizationStatus, cardType, place, onHover, onAddToFavorites} = props;
  const {id, name, type, price, photo, rating, isPremium, isFavorite} = place;

  const ratingPercent: number = getRatingPercent(rating);
  const placeType: string = capitalizeWord(type);

  const isAuth: boolean = authorizationStatus === AuthorizationStatus.AUTH;
  const bookmarkActiveClass: string = isFavorite ? `place-card__bookmark-button--active` : ``;
  const bookmarkName = `${isFavorite ? `In` : `To`} bookmarks`;

  const isCityCardType: boolean = cardType === CardType.CITIES;
  const articleClassName: string = isCityCardType ? `${cardType}__place-card` : `${cardType}__card`;
  const imageSize: {width: number; height: number} = cardType === CardType.FAVORITES ? ImageSize.FAVORITES : ImageSize.DEFAULT;
  const isCardMark: boolean = isCityCardType && isPremium;

  return (
    <article className={`${articleClassName} place-card`}
      onMouseEnter={() => isCityCardType && onHover(id)}
      onMouseLeave={() => isCityCardType && onHover(0)}
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
            onClick={() => onAddToFavorites({
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
          <Link to={`${AppRoute.OFFER}/${id}`}>
            {name}
          </Link>
        </h2>
        <p className="place-card__type">{placeType}</p>
      </div>
    </article>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export const mapDispatchToProps = (dispatch) => ({
  onAddToFavorites(favoriteData) {
    dispatch(DataOperation.addToFavorites(favoriteData));
  },
});

export {PlaceCard};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
