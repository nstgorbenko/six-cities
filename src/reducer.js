import allOffers from "./mocks/offers.js";
import {SortType} from "./const.js";

const initialCity = `Paris`;

const initialState = {
  city: initialCity,
  offers: allOffers,
  sortType: SortType.POPULAR,
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),

  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload,
      });
    case ActionType.CHANGE_SORT_TYPE:
      return Object.assign({}, state, {
        sortType: action.payload,
      });
    default:
      return state;
  }
};
