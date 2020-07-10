import allOffers from "./mocks/offers.js";
import {SortType, ScreenType} from "./const.js";

const initialCity = `Paris`;

const initialState = {
  city: initialCity,
  offers: allOffers,
  sortType: SortType.POPULAR,
  screen: ScreenType.DEFAULT,
  activeOffer: ``,
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_ACTIVE_OFFER: `CHANGE_ACTIVE_OFFER`,
  CHANGE_SCREEN_TYPE: `CHANGE_SCREEN_TYPE`,
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

  changeActiveOffer: (id) => ({
    type: ActionType.CHANGE_ACTIVE_OFFER,
    payload: id,
  }),

  changeScreenType: (type) => ({
    type: ActionType.CHANGE_SCREEN_TYPE,
    payload: type,
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
    case ActionType.CHANGE_ACTIVE_OFFER:
      return Object.assign({}, state, {
        activeOffer: action.payload,
      });
    case ActionType.CHANGE_SCREEN_TYPE:
      return Object.assign({}, state, {
        screen: action.payload,
      });
    default:
      return state;
  }
};
