import { combineReducers } from "redux"

import userReducer from "./userReducer.js"
import tokenReducer from './tokenReducer.js'


//this combines all the reducers into one that is passed to the store
export default combineReducers({
  userReducer,
  tokenReducer
})
