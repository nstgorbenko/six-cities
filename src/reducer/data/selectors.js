import {createSelector} from "reselect";

import {getCity} from "../app/selectors.js";
import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

const getGroupedOffers = (state) => state[NAME_SPACE].offers;

export const getOffers = createSelector(getGroupedOffers,
    (offers) => {
      if (offers.length > 0) {
        return offers.map((group) => group.offers)
          .reduce((a, b) => a.concat(b));
      }
      return [];
    });

export const getCities = createSelector(getGroupedOffers,
    (offers) => {
      if (offers.length > 0) {
        return offers.map(({name, location}) => ({name, location}));
      }
      return [];
    });

export const getCityOffers = createSelector(getGroupedOffers, getCity,
    (allOffers, city) => {
      if (allOffers.length > 0 && city.name !== ``) {
        return allOffers.find(({name}) => name === city.name).offers;
      }
      return [];
    });

export const getLoadStatus = (state) => state[NAME_SPACE].loadStatus;

export const getFavorites = (state) => state[NAME_SPACE].favorites;
