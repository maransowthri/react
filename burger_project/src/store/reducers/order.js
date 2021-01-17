import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLACE_ORDER_INIT:
      return updateObject(state, { purchased: false });

    case actionTypes.PLACE_ORDER_INPROGRESS:
      return updateObject(state, { loading: true, purchased: false });

    case actionTypes.PLACE_ORDER_SUCCESS:
      return updateObject(state, {
        orders: state.orders.concat(action.payload.order),
        loading: false,
        purchased: true,
      });

    case actionTypes.PLACE_ORDER_FAILED:
      return updateObject(state, { error: true, loading: false });

    case actionTypes.FETCH_ORDERS_INIT:
      return { ...state };

    case actionTypes.FETCH_ORDERS_INPROGRESS:
      return updateObject(state, { loading: true, error: false });

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        orders: action.payload.orders,
        loading: false,
      });

    case actionTypes.FETCH_ORDERS_FAILED:
      return updateObject(state, { error: true, loading: false });

    default:
      return state;
  }
};

export default reducer;
