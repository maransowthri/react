import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  results: [],
};

const storeResult = (state, action) => {
  const updatedResults = state.results.concat({
    id: new Date(),
    value: action.payload.counter,
  });
  return updateObject(state, { results: updatedResults });
};

const deleteResult = (state, action) => {
  const filteredResults = state.results.filter(
    (item) => item.id !== action.payload.id
  );
  return updateObject(state, { results: filteredResults });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return storeResult(state, action);
    case actionTypes.DELETE_RESULT:
      return deleteResult(state, action);
    default:
      return state;
  }
};

export default reducer;
