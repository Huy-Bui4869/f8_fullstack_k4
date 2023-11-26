//Tạo store
import { combineReducers, legacy_createStore as createStore } from "redux";

import { maxNumberReducer } from "./maxNumberReducer";
import { checkResult } from "./checkResult";
import { resetResult } from "./resetReducer";

const rootReducer = combineReducers({
  numberRange: maxNumberReducer,
  checkResult: checkResult,
  reset: resetResult,
});

export const store = createStore(rootReducer);
