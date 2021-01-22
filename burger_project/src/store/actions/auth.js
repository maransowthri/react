import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios-auth";

export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT,
  };
};

const authInProgress = () => {
  return {
    type: actionTypes.AUTH_INPROGRESS,
  };
};

const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { userID: authData.localId, token: authData.idToken },
  };
};

const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: { error },
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");
  localStorage.removeItem("userID");

  return {
    type: actionTypes.LOGOUT,
  };
};

const setExpiration = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
    const endPoint =
      type === actionTypes.SIGNUP
        ? "accounts:signUp?key=AIzaSyCPU82kuI-vBQBeh-AOB74BspPy8RLmtyw"
        : "accounts:signInWithPassword?key=AIzaSyCPU82kuI-vBQBeh-AOB74BspPy8RLmtyw";
    axios
      .post(endPoint, authPostData)
      .then((res) => {
        let expiryDate = new Date(
          new Date().getTime() + parseInt(res.data.expiresIn) * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expiryDate", expiryDate);
        localStorage.setItem("userID", res.data.localId);
        console.log(res.data);
        dispatch(authSuccess(res.data));
        dispatch(setExpiration(+res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFailed(err.message));
      });
  };
};

export const autoSignIn = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userID = localStorage.getItem("userID");
      const expiryDate = localStorage.getItem("expiryDate");
      if (new Date() > new Date(expiryDate)) {
        dispatch(logout());
      }
      dispatch(authSuccess({ localId: userID, idToken: token }));
      const expiryDateInSeconds = new Date(expiryDate) - new Date();
      dispatch(setExpiration(expiryDateInSeconds / 1000));
    }
  };
};
