import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => state[NAME_SPACE].authorizationStatus;

export const getUserInfo = (state) => state[NAME_SPACE].info;

export const getErrorStatus = (state) => state[NAME_SPACE].isError;
