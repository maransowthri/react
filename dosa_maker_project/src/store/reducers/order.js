import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  error: "",
  purchased: false,
};

export const placeOrderInit = (state, action) => {
  return updateObject(state, { error: "", purchased: false });
};

const placeOrderInProgress = (state, action) => {
  return updateObject(state, { loading: true, error: "", purchased: false });
};

const placeOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: state.orders.concat(action.payload.order),
    loading: false,
    purchased: true,
  });
};

const placeOrderFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.payload.error });
};

const fetchOrdersInit = (state, action) => {
  return updateObject(state, { error: "" });
};

const fetchOrdersInProgress = (state, action) => {
  return updateObject(state, { loading: true, error: "" });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.payload.orders,
    loading: false,
  });
};

const fetchOrdersFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.payload.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLACE_ORDER_INIT:
      return placeOrderInit(state, action);
    case actionTypes.PLACE_ORDER_INPROGRESS:
      return placeOrderInProgress(state, action);
    case actionTypes.PLACE_ORDER_SUCCESS:
      return placeOrderSuccess(state, action);
    case actionTypes.PLACE_ORDER_FAILED:
      return placeOrderFailed(state, action);
    case actionTypes.FETCH_ORDERS_INIT:
      return fetchOrdersInit(state, action);
    case actionTypes.FETCH_ORDERS_INPROGRESS:
      return fetchOrdersInProgress(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
