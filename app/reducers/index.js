import { combineReducers } from "redux"

import user from "./userReducer"


//this combines all the reducers into one that is passed to the store
export default combineReducers({
  user
})
