import {adaptOffers} from "../../utils/adapter.js";
import {groupOffersByCities} from "../../utils/common.js";

export const LoadStatus = {
  ERROR: `ERROR`,
  LOADING: `LOADING`,
  SUCCESS: `SUCCESS`,
};

const initialState = {
  loadStatus: LoadStatus.SUCCESS,
  offers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  UPDATE_LOAD_STATUS: `UPDATE_LOAD_STATUS`,
};

const ActionCreator = {
  updateLoadStatus: (loadStatus) => ({
    type: ActionType.UPDATE_LOAD_STATUS,
    payload: loadStatus,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
};

const Operation = {
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

  postReview: (reviewData) => (dispatch, getState, api) => {
    dispatch(ActionCreator.updateLoadStatus(LoadStatus.LOADING));

    return api.post(`/comments/${reviewData.hotelId}`, {
      comment: reviewData.comment,
      rating: reviewData.rating,
    })
    .then(() => {
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
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
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
