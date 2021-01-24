import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios-auth";

const authInProgress = () => {
  return {
    type: actionTypes.AUTH_INPROGRESS,
  };
};

const authSuccess = (userID, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { userID, token },
  };
};

const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: { error },
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");
  localStorage.removeItem("userID");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (email, password, type) => {
  return (dispatch) => {
    dispatch(authInProgress());
    const authPostData = {
      email,
      password,
      returnSecureToken: true,
    };
    const endpoint =
      type === actionTypes.SIGNUP
        ? "/accounts:signUp?key=AIzaSyAfcomMeyYNYyr1A4J7UpNow9bUikfptJc"
        : "/accounts:signInWithPassword?key=AIzaSyAfcomMeyYNYyr1A4J7UpNow9bUikfptJc";
    axios
      .post(endpoint, authPostData)
      .then((res) => {
        dispatch(authSuccess(res.data.localId, res.data.idToken));
        let expiryDate = new Date(
          new Date().getTime() + parseInt(res.data.expiresIn) * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expiryDate", expiryDate);
        localStorage.setItem("userID", res.data.localId);
      })
      .catch((err) => {
        dispatch(authFailed(err.message));
      });
  };
};

export const autoSignIn = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const expiryDate = new Date(localStorage.getItem("expiryDate"));
      if (new Date() < expiryDate) {
        const userID = localStorage.getItem("userID");
        dispatch(authSuccess(userID, token));
      }
    }
  };
};
