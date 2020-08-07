import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.APP;

export const getActiveOffer = (state) => state[NAME_SPACE].activeOffer;

export const getCity = (state) => state[NAME_SPACE].city;

export const getSortType = (state) => state[NAME_SPACE].sortType;

