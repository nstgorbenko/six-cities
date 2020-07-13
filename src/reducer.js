import {SortType, ScreenType} from "./const.js";

const initialCity = `Paris`;

const initialState = {
  city: initialCity,
  offers: [],
  sortType: SortType.POPULAR,
  screen: ScreenType.DEFAULT,
  activeOffer: ``,
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_ACTIVE_OFFER: `CHANGE_ACTIVE_OFFER`,
  CHANGE_SCREEN_TYPE: `CHANGE_SCREEN_TYPE`,
  LOAD_OFFERS: `LOAD_OFFERS`,
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

  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
};

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then(({data}) => {
        dispatch(ActionCreator.loadOffers(data));
      })
      .catch((error) => {
        throw error;
      });
  },
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
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
      });
    default:
      return state;
  }
};
