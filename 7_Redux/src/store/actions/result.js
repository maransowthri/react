import * as actionTypes from "./actionTypes";

export const storeResult = (counter) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: actionTypes.STORE_RESULT, payload: { counter } });
    }, 3000);
  };
};

export const deleteResult = (id) => {
  return { type: actionTypes.DELETE_RESULT, payload: { id } };
};
