import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios-orders";

export const placeOrderInit = () => {
  return {
    type: actionTypes.PLACE_ORDER_INIT,
  };
};

const placeOrderInprogress = () => {
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

const placeOrderFailed = () => {
  return {
    type: actionTypes.PLACE_ORDER_FAILED,
  };
};

export const placeOrder = (order) => {
  return (dispatch) => {
    dispatch(placeOrderInprogress());
    axios
      .post("orders.json", order)
      .then((res) => {
        dispatch(placeOrderSuccess(order));
      })
      .catch((err) => {
        console.log(err);
        dispatch(placeOrderFailed());
      });
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

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersInProgress());
    axios
      .get("orders.json")
      .then((res) => {
        dispatch(fetchOrdersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchOrdersFailed());
      });
  };
};
