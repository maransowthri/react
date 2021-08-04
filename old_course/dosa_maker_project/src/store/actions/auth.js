import * as actionTypes from "./actionTypes";

export const authInProgress = () => {
  return {
    type: actionTypes.AUTH_INPROGRESS,
  };
};

export const authSuccess = (userID, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { userID, token },
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    payload: { error },
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_INIT,
  };
};

export const authLogoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (email, password, type) => {
  return {
    type: actionTypes.USER_AUTH,
    payload: { email, password, type },
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
