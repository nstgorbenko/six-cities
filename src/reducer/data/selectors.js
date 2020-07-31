import {createSelector} from "reselect";

import {getCity} from "../app/selectors.js";
import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => state[NAME_SPACE].offers;

export const getCities = createSelector(getOffers,
    (offers) => {
      if (offers.length > 0) {
        return offers.map(({name, location}) => ({name, location}));
      }
      return [];
    });

export const getCityOffers = createSelector(getOffers, getCity,
    (allOffers, city) => {
      if (allOffers.length > 0 && city.name !== ``) {
        return allOffers.find(({name}) => name === city.name).offers;
      }
      return [];
    });

export const getLoadStatus = (state) => state[NAME_SPACE].loadStatus;
