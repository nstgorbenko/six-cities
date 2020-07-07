import allOffers from "./mocks/offers.js";

const initialCity = `Paris`;

const initialState = {
  city: initialCity,
  offers: allOffers,
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload,
      });
    default:
      return state;
  }
};
