import { put } from "redux-saga/effects";
import axios from "../../axios/axios-orders";
import * as actions from "../actions";

export function* placeOrderSaga(action) {
  yield put(actions.placeOrderInprogress());
  try {
    yield axios.post(
      "orders.json?auth=" + action.payload.token,
      action.payload.order
    );
    yield put(actions.placeOrderSuccess(action.payload.order));
  } catch (err) {
    yield put(actions.placeOrderFailed());
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersInProgress());
  const queryParam =
    "?auth=" +
    action.payload.token +
    '&orderBy="userID"&equalTo="' +
    action.payload.userID +
    '"';
  try {
    const res = yield axios.get("orders.json" + queryParam);
    yield put(actions.fetchOrdersSuccess(res.data));
  } catch (err) {
    yield put(actions.fetchOrdersFailed());
  }
}
