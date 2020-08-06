import {SortType} from "../../const.js";

const initialState = {
  city: {
    name: ``,
    location: {
      coordinates: [0, 0],
      zoom: 0,
    }
  },
  sortType: SortType.POPULAR,
  activeOffer: 0,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_ACTIVE_OFFER: `CHANGE_ACTIVE_OFFER`,
};

const ActionCreator = {
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
  })
};

const reducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export {ActionCreator, ActionType, reducer};
