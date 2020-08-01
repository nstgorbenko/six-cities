import React from "react";
import PropTypes from "prop-types";

import {AuthorizationStatus} from "../../reducer/user/user.js";
import {CardType, SortType} from "../../const.js";
import {capitalizeWord, getRatingPercent} from "../../utils/common.js";
import Header from "../header/header.jsx";
import {offerType} from "../../types.js";

import Map from '../map/map.jsx';
import PlacesList from "../places-list/places-list.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import withReview from "../../hocs/with-review/with-review.js";
// import ReviewsList from "../reviews-list/reviews-list.jsx";

const ClassName = {
  FAVORITE: `property__bookmark-button--active`,
  SUPER_HOST: `property__avatar-wrapper--pro`
};

const Offer = (props) => {
  const {authorizationStatus, place, allPlaces, onPlaceCardNameClick} = props;
  const {id, location, name, type, description, price, allPhotos, bedrooms, adults, amenities, host, rating, isPremium, isFavorite} = place;
  const {name: hostName, avatar: hostAvatar, isSuper: isSuperHost} = host;

  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;
  const nearbyPlaces = allPlaces.filter((currentPlace) => currentPlace.id !== id);
  const ratingPercent = getRatingPercent(rating);
  const placeType = capitalizeWord(type);

  const ReviewFormWrapped = withReview(ReviewForm);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {allPhotos.map((photo, index) =>
                <div className="property__image-wrapper" key={photo + index}>
                  <img className="property__image" src={photo} alt="Photo studio"/>
                </div>
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : null}
              <div className="property__name-wrapper">
                <h1 className="property__name">{name}</h1>
                <button className={`property__bookmark-button ${isFavorite ? ClassName.FAVORITE : ``} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${ratingPercent}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{placeType}</li>
                <li className="property__feature property__feature--bedrooms">{bedrooms} Bedrooms</li>
                <li className="property__feature property__feature--adults">
                  Max {adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {amenities.map((amenity, index) =>
                    <li className="property__inside-item" key={amenity + index}>{amenity}</li>
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${isSuperHost ? ClassName.SUPER_HOST : ``} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={hostAvatar} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">{hostName}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                {/* <ReviewsList
                  reviews={reviews}
                /> */}
                {isAuth &&
                <ReviewFormWrapped
                  id={id}
                />}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              center={location}
              offers={allPlaces}
              activeOffer={id}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList
              type={CardType.NEAR_PLACES}
              places={nearbyPlaces}
              sortType={SortType.POPULAR}
              onPlaceCardNameClick={onPlaceCardNameClick}
              onPlaceCardHover={() => {}}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

Offer.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  place: PropTypes.shape(offerType).isRequired,
  allPlaces: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onPlaceCardNameClick: PropTypes.func.isRequired,
};

export default Offer;
