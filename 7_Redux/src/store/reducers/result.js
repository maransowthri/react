import * as actionTypes from "../actions/actionTypes";

const initialState = {
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({
          id: new Date(),
          value: action.payload.counter,
        }),
      };
    case actionTypes.DELETE_RESULT:
      return {
        ...state,
        results: state.results.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default reducer;
