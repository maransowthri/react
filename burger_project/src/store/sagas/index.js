import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  setExpirationSaga,
  authSaga,
  autoSignInSaga,
} from "./auth";
import { fetchIngredientsSaga } from "./burgerBuilder";
import { placeOrderSaga, fetchOrdersSaga } from "./order";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.LOGOUT_INIT, logoutSaga),
    takeEvery(actionTypes.SET_EXPIRATION, setExpirationSaga),
    takeEvery(actionTypes.AUTH_USER, authSaga),
    takeEvery(actionTypes.AUTH_AUTO_SIGNIN, autoSignInSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.FETCH_INGREDIENTS_INIT, fetchIngredientsSaga);
}

export function* watchOrder() {
  yield takeLatest(actionTypes.USER_PLACE_ORDER, placeOrderSaga);
  yield takeEvery(actionTypes.USER_FETCH_ORDERS, fetchOrdersSaga);
}
