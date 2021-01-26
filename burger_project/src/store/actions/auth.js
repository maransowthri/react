import * as actionTypes from "./actionTypes";

export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT,
  };
};

export const authInProgress = () => {
  return {
    type: actionTypes.AUTH_INPROGRESS,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { userID: authData.localId, token: authData.idToken },
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: { error },
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT_INIT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const setExpiration = (expirationTime) => {
  return {
    type: actionTypes.SET_EXPIRATION,
    payload: { expirationTime },
  };
};

export const auth = (email, password, type) => {
  return {
    type: actionTypes.AUTH_USER,
    payload: { email, password },
  };
};

export const setAlert = (message) => {
  return {
    type: actionTypes.SET_ALERT,
    payload: { alertMessage: message },
  };
};

export const removeAlert = () => {
  return {
    type: actionTypes.REMOVE_ALERT,
  };
};

export const autoSignIn = () => {
  return {
    type: actionTypes.AUTH_AUTO_SIGNIN,
  };
};
