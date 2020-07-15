import {combineReducers} from "redux";
import NameSpace from "./name-space.js";

import {reducer as appReducer} from "./app/app.js";
import {reducer as dataReducer} from "./data/data.js";

export default combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.DATA]: dataReducer,
});
