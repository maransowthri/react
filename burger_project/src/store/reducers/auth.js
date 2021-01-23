import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userID: null,
  error: null,
  loading: false,
  showAlert: false,
  alertMessage: "",
};

const authInProgress = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    token: action.payload.token,
    userID: action.payload.userID,
  });
};

const authFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.payload.error });
};

const logout = (state, action) => {
  return updateObject(state, { userID: null, token: null });
};

const setAlert = (state, action) => {
  return updateObject(state, {
    showAlert: true,
    alertMessage: action.payload.alertMessage,
  });
};

const removeAlert = (state, action) => {
  return updateObject(state, { showAlert: false, alertMessage: "" });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INPROGRESS:
      return authInProgress(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    case actionTypes.SET_ALERT:
      return setAlert(state, action);
    case actionTypes.REMOVE_ALERT:
      return removeAlert(state, action);
    default:
      return state;
  }
};

export default reducer;
