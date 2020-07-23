import PropTypes from "prop-types";

import {OFFER_TYPES} from "./const.js";

export const locationType = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};

export const reviewType = {
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export const cityType = {
  name: PropTypes.string.isRequired,
  location: PropTypes.shape(locationType).isRequired,
};

export const offerType = {
  id: PropTypes.number.isRequired,
  city: PropTypes.shape(cityType).isRequired,
  location: PropTypes.shape(locationType).isRequired,
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    isSuper: PropTypes.bool.isRequired
  }).isRequired,
  rating: PropTypes.number.isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

export const userType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isSuper: PropTypes.bool.isRequired,
};
