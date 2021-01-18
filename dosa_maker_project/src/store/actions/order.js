import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios-orders";

export const placeOrderInit = () => {
  return {
    type: actionTypes.PLACE_ORDER_INIT,
  };
};

const placeOrderInProgress = () => {
  return {
    type: actionTypes.PLACE_ORDER_INPROGRESS,
  };
};

const placeOrderSuccess = (order) => {
  return {
    type: actionTypes.PLACE_ORDER_SUCCESS,
    payload: { order },
  };
};

const placeOrderFailed = (error) => {
  return {
    type: actionTypes.PLACE_ORDER_FAILED,
    payload: { error },
  };
};

export const placeOrder = (order) => {
  return (dispatch) => {
    dispatch(placeOrderInProgress());
    axios
      .post("orders.json", order)
      .then((res) => {
        dispatch(placeOrderSuccess(order));
      })
      .catch((err) => {
        dispatch(placeOrderFailed(err));
      });
  };
};

export const fetchOrdersInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
  };
};

const fetchOrdersInProgress = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INPROGRESS,
  };
};

const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: { orders },
  };
};

const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    payload: { error },
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersInProgress());
    axios
      .get("orders.json")
      .then((res) => {
        dispatch(fetchOrdersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchOrdersFailed(err));
      });
  };
};
