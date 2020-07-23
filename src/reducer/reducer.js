import {combineReducers} from "redux";
import NameSpace from "./name-space.js";

import {reducer as appReducer} from "./app/app.js";
import {reducer as dataReducer} from "./data/data.js";
import {reducer as userReducer} from "./user/user.js";

export default combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.DATA]: dataReducer,
  [NameSpace.USER]: userReducer,
});
