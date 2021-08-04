import { put, delay, call } from "redux-saga/effects";
import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios/axios-auth";

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "expiryDate");
  yield call([localStorage, "removeItem"], "userID");
  yield put(actions.logoutSucceed());
}

export function* setExpirationSaga(action) {
  yield delay(+action.payload.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authSaga(action) {
  yield put(actions.authInProgress());
  const authPostData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true,
  };
  const endPoint =
    action.type === actionTypes.SIGNUP
      ? "accounts:signUp?key=AIzaSyCPU82kuI-vBQBeh-AOB74BspPy8RLmtyw"
      : "accounts:signInWithPassword?key=AIzaSyCPU82kuI-vBQBeh-AOB74BspPy8RLmtyw";
  try {
    const res = yield axios.post(endPoint, authPostData);
    let expiryDate = new Date(
      new Date().getTime() + parseInt(res.data.expiresIn) * 1000
    );
    yield localStorage.setItem("token", res.data.idToken);
    yield localStorage.setItem("expiryDate", expiryDate);
    yield localStorage.setItem("userID", res.data.localId);
    yield put(actions.authSuccess(res.data));
    yield put(actions.setExpiration(+res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFailed(err.message));
  }
}

export function* autoSignInSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const userID = yield localStorage.getItem("userID");
    const expiryDate = yield localStorage.getItem("expiryDate");
    if (yield new Date() > new Date(expiryDate)) {
      put(actions.logout());
    }
    yield put(actions.authSuccess({ localId: userID, idToken: token }));
    const expiryDateInSeconds = yield new Date(expiryDate) - new Date();
    yield put(actions.setExpiration(expiryDateInSeconds / 1000));
  }
}
