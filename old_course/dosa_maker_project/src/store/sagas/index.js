import { takeEvery, all } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import { authLogoutSaga, authSaga } from "./auth";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_LOGOUT_INIT, authLogoutSaga),
    takeEvery(actionTypes.USER_AUTH, authSaga),
  ]);
}
