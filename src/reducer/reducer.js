import {combineReducers} from "redux";
import NameSpace from "./name-space";

import {reducer as appReducer} from "./app/app";
import {reducer as dataReducer} from "./data/data";
import {reducer as userReducer} from "./user/user";

export default combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.DATA]: dataReducer,
  [NameSpace.USER]: userReducer,
});
