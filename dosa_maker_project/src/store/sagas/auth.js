import { put } from "redux-saga/effects";
import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/axios-auth";

export function* authLogoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expiryDate");
  yield localStorage.removeItem("userID");
  yield put(actions.authLogoutSucceed());
}

export function* authSaga(action) {
  yield put(actions.authInProgress());
  const authPostData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true,
  };
  const endpoint =
    action.payload.type === actionTypes.SIGNUP
      ? "/accounts:signUp?key=AIzaSyAfcomMeyYNYyr1A4J7UpNow9bUikfptJc"
      : "/accounts:signInWithPassword?key=AIzaSyAfcomMeyYNYyr1A4J7UpNow9bUikfptJc";
  try {
    const res = yield axios.post(endpoint, authPostData);
    yield put(actions.authSuccess(res.data.localId, res.data.idToken));
    let expiryDate = yield new Date(
      new Date().getTime() + parseInt(res.data.expiresIn) * 1000
    );
    yield localStorage.setItem("token", res.data.idToken);
    yield localStorage.setItem("expiryDate", expiryDate);
    yield localStorage.setItem("userID", res.data.localId);
  } catch (err) {
    yield put(actions.authFailed(err.message));
  }
}
