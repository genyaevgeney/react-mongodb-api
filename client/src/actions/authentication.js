import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = user => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://react-mongodb-api.com/register", user)
      .then(res => resolve(res))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
        resolve({
          data: {
            isSuccessRegistration: false
          }
        });
      });
  });
};

export const resetPassword = data => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://react-mongodb-api.com/forgotPassword", data)
      .then(res => resolve(res.data.isSuccessSendingMail))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  });
};

export const loginUser = user => dispatch => {
  axios
    .post("http://react-mongodb-api.com/login", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push("/");
};
