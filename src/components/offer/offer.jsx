import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute, CardType, SortType} from "../../const.js";
import {capitalizeWord, getRatingPercent} from "../../utils/common.js";
import {offerType, reviewType} from "../../types.js";

import Header from "../header/header.jsx";
import Map from '../map/map.jsx';
import PlacesList from "../places-list/places-list.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import withReview from "../../hocs/with-review/with-review.js";

const ClassName = {
  FAVORITE: `property__bookmark-button--active`,
  SUPER_HOST: `property__avatar-wrapper--pro`
};

const MAX_NEARBY_OFFERS_COUNT = 3;
const MAX_PHOTOS_COUNT = 6;

class Offer extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._updateData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.place.id !== this.props.place.id) {
      this._updateData();
    }
  }

  _updateData() {
    const {loadNearbyOffers, loadReviews, place} = this.props;

    loadNearbyOffers(place.id);
    loadReviews(place.id);
  }

  render() {
    const {authorizationStatus, place, nearbyOffers, reviews, onPlaceCardNameClick, addToFavorites} = this.props;
    const {id, location, name, type, description, price, allPhotos, bedrooms, adults, amenities, host, rating, isPremium, isFavorite} = place;
    const {name: hostName, avatar: hostAvatar, isSuper: isSuperHost} = host;

    const isAuth = authorizationStatus === AuthorizationStatus.AUTH;
    const shownNearbyPlaces = nearbyOffers.slice(0, MAX_NEARBY_OFFERS_COUNT);
    const mapPlaces = shownNearbyPlaces.concat(place);
    const ratingPercent = getRatingPercent(rating);
    const placeType = capitalizeWord(type);
    const photos = allPhotos.slice(0, MAX_PHOTOS_COUNT);
    const bookmarkName = `${isFavorite ? `In` : `To`} bookmarks`;

    const ReviewFormWrapped = withReview(ReviewForm);

    return (
      <div className="page">
        <Header />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {photos.map((photo, index) =>
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
                  <Link
                    className={`property__bookmark-button ${isFavorite ? ClassName.FAVORITE : ``} button`}
                    onClick={() => addToFavorites({
                      hotelId: id,
                      status: Number(!isFavorite)
                    })}
                    to={isAuth ? `${AppRoute.OFFER}/${id}` : AppRoute.LOGIN}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">{bookmarkName}</span>
                  </Link>
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
                  <li className="property__feature property__feature--bedrooms">{bedrooms} {bedrooms === 1 ? `Bedroom` : `Bedrooms`}</li>
                  <li className="property__feature property__feature--adults">Max {adults} {adults === 1 ? `adult` : `adults`}</li>
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
                      <img className="property__avatar user__avatar" src={`/${hostAvatar}`} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">{hostName}</span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">{description}</p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewsList
                    reviews={reviews}
                  />
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
                offers={mapPlaces}
                activeOffer={id}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <PlacesList
                type={CardType.NEAR_PLACES}
                places={shownNearbyPlaces}
                sortType={SortType.POPULAR}
                onPlaceCardNameClick={onPlaceCardNameClick}
              />
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Offer.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  place: PropTypes.shape(offerType).isRequired,
  nearbyOffers: PropTypes.arrayOf(PropTypes.shape(offerType)).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewType)).isRequired,
  addToFavorites: PropTypes.func.isRequired,
  loadNearbyOffers: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  onPlaceCardNameClick: PropTypes.func.isRequired,
};

export default Offer;
