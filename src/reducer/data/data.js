import {adaptOffers} from "../../utils/adapter.js";
import {groupOffersByCities} from "../../utils/common.js";

const initialState = {
  offers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
      });
    default:
      return state;
  }
};

export {ActionCreator, ActionType, Operation, reducer};
