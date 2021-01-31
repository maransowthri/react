import { put } from "redux-saga/effects";
import * as actions from "../actions";
import axios from "../../axios/axios-orders";

export function* fetchIngredientsSaga(action) {
  if (action.payload.preserveIngredients) {
    yield put(actions.preservedIngredientsSuccess());
  } else {
    yield put(actions.fetchIngredientsInProgress());
    try {
      const res = yield axios.get("ingredients.json");
      yield put(actions.fetchIngredientsSuccess(res.data));
    } catch (err) {
      yield put(actions.fetchIngredientsFailed());
    }
  }
}
