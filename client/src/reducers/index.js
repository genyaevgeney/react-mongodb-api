import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import donations from "./donations";
import userDonations from "./userDonations";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  routing: routerReducer,
  donations,
  userDonations
});
