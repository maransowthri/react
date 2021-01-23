import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userID: null,
  loading: false,
  error: "",
};

const authInProgress = (state, action) => {
  return updateObject(state, { loading: true, error: "" });
};

const authSuccess = (state, action) => {
  console.log(action.payload);
  return updateObject(state, {
    token: action.payload.token,
    userID: action.payload.userID,
    loading: false,
  });
};

const authFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.payload.error });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userID: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INPROGRESS:
      return authInProgress(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
