import * as actionTypes from "./actionTypes";

export const storeResult = (counter) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      console.log(
        "[ResultActionCrearors] old counter:",
        getState().ctr.counter
      );
      dispatch({ type: actionTypes.STORE_RESULT, payload: { counter } });
    }, 3000);
  };
};

export const deleteResult = (id) => {
  return { type: actionTypes.DELETE_RESULT, payload: { id } };
};
