import {adaptOffer, adaptOffers, adaptReviews} from "../../utils/adapter.js";
import {groupOffersByCities, updateOffers, updateFavorites, updateNearbyOffers} from "../../utils/common.js";
import {getGroupedOffers, getFavorites, getNearbyOffers} from "./selectors.js";

export const LoadStatus = {
  ERROR: `ERROR`,
  LOADING: `LOADING`,
  SUCCESS: `SUCCESS`,
};

const initialState = {
  favorites: [],
  loadStatus: LoadStatus.SUCCESS,
  nearbyOffers: [],
  offers: [],
  reviews: [],
};

const ActionType = {
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  UPDATE_LOAD_STATUS: `UPDATE_LOAD_STATUS`,
};

const ActionCreator = {
  loadFavorites: (favoriteOffers) => ({
    type: ActionType.LOAD_FAVORITES,
    payload: favoriteOffers,
  }),
  loadNearbyOffers: (nearbyOffers) => ({
    type: ActionType.LOAD_NEARBY_OFFERS,
    payload: nearbyOffers,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
  updateLoadStatus: (loadStatus) => ({
    type: ActionType.UPDATE_LOAD_STATUS,
    payload: loadStatus,
  }),
};

const Operation = {
  addToFavorites: (favoriteOffer) => (dispatch, getState, api) => {
    return api.post(`/favorite/${favoriteOffer.hotelId}/${favoriteOffer.status}`)
    .then(({data}) => {
      const adaptedFavoriteOffer = adaptOffer(data);

      const oldOffers = getGroupedOffers(getState()).slice();
      const oldFavorites = getFavorites(getState()).slice();
      const oldNearbyOffers = getNearbyOffers(getState()).slice();

      const groupedOffers = updateOffers(oldOffers, adaptedFavoriteOffer);
      const favoriteOffers = updateFavorites(oldFavorites, adaptedFavoriteOffer);
      const nearbyOffers = updateNearbyOffers(oldNearbyOffers, adaptedFavoriteOffer);

      dispatch(ActionCreator.loadOffers(groupedOffers));
      dispatch(ActionCreator.loadFavorites(favoriteOffers));
      dispatch(ActionCreator.loadNearbyOffers(nearbyOffers));
    })
    .catch((error) => {
      throw error;
    });
  },

  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then(({data}) => {
        const adaptedFavoriteOffers = adaptOffers(data);
        dispatch(ActionCreator.loadFavorites(adaptedFavoriteOffers));
      })
      .catch((error) => {
        throw error;
      });
  },

  loadNearbyOffers: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${hotelId}/nearby`)
    .then(({data}) => {
      const adaptedOffers = adaptOffers(data);
      dispatch(ActionCreator.loadNearbyOffers(adaptedOffers));
    })
    .catch((error) => {
      throw error;
    });
  },

  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then(({data}) => {
        const adaptedOffers = adaptOffers(data);
        const groupedOffers = groupOffersByCities(adaptedOffers);
        dispatch(ActionCreator.loadOffers(groupedOffers));
        return groupedOffers;
      })
      .catch((error) => {
        throw error;
      });
  },

  loadReviews: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/comments/${hotelId}`)
    .then(({data}) => {
      const adaptedReviews = adaptReviews(data);
      dispatch(ActionCreator.loadReviews(adaptedReviews));
    })
    .catch((error) => {
      throw error;
    });
  },

  postReview: (reviewData) => (dispatch, getState, api) => {
    dispatch(ActionCreator.updateLoadStatus(LoadStatus.LOADING));

    return api.post(`/comments/${reviewData.hotelId}`, {
      comment: reviewData.comment,
      rating: reviewData.rating,
    })
    .then(({data}) => {
      const adaptedReviews = adaptReviews(data);
      dispatch(ActionCreator.loadReviews(adaptedReviews));
      dispatch(ActionCreator.updateLoadStatus(LoadStatus.SUCCESS));
    })
    .catch((error) => {
      dispatch(ActionCreator.updateLoadStatus(LoadStatus.ERROR));
      throw error;
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.payload,
      });
    case ActionType.LOAD_NEARBY_OFFERS:
      return Object.assign({}, state, {
        nearbyOffers: action.payload,
      });
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload,
      });
    case ActionType.UPDATE_LOAD_STATUS:
      return Object.assign({}, state, {
        loadStatus: action.payload,
      });
    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operation, reducer};
