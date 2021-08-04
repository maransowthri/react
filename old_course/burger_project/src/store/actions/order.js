import * as actionTypes from "./actionTypes";

export const placeOrderInit = () => {
  return {
    type: actionTypes.PLACE_ORDER_INIT,
  };
};

export const placeOrderInprogress = () => {
  return {
    type: actionTypes.PLACE_ORDER_INPROGRESS,
  };
};

export const placeOrderSuccess = (order) => {
  return {
    type: actionTypes.PLACE_ORDER_SUCCESS,
    payload: { order },
  };
};

export const placeOrderFailed = () => {
  return {
    type: actionTypes.PLACE_ORDER_FAILED,
  };
};

export const placeOrder = (order, token) => {
  return {
    type: actionTypes.USER_PLACE_ORDER,
    payload: { order, token },
  };
};

export const fetchOrdersInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
  };
};

export const fetchOrdersInProgress = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INPROGRESS,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: { orders },
  };
};

export const fetchOrdersFailed = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
  };
};

export const fetchOrders = (token, userID) => {
  return {
    type: actionTypes.USER_FETCH_ORDERS,
    payload: { token, userID },
  };
};
