import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Router, Route, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import Dashboard from "./containers/DashboardPage/Dashboard";
import Donate from "./containers/DonatePage/Donate";
import "./assets/scss/bootstrap.min.css";
import reducer from "./reducers";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import UserDashboard from "./containers/UserDashboard";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const inititalState = {};

const store = createStore(
  reducer,
  inititalState,
  composeWithDevTools(applyMiddleware(thunk))
);
const history = syncHistoryWithStore(browserHistory, store);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/page=:id" component={Dashboard} />
      <Route path="/donation" component={Donate} />
      <Route exact path="/userdashboard/:id" component={UserDashboard} />
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/reset-password" component={ForgotPassword} />
      <Route exact path="/reset/:token" component={ResetPassword} />
      <Route path="*" component={ErrorPage} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
