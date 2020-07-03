import PropTypes from "prop-types";

import {OFFER_TYPES} from "./const.js";

export const reviewType = {
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export const offerType = {
  id: PropTypes.string.isRequired,
  location: PropTypes.arrayOf(PropTypes.number).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(OFFER_TYPES).isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  photo: PropTypes.string.isRequired,
  allPhotos: PropTypes.arrayOf(PropTypes.string).isRequired,
  bedrooms: PropTypes.number.isRequired,
  adults: PropTypes.number.isRequired,
  amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    isSuper: PropTypes.bool.isRequired
  }).isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewType)).isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired
};
