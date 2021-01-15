import * as actionTypes from "../actions";

const initialState = {
  averageWeight: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CALCULATE_AVG:
      let totalWeight = action.payload.persons.reduce((prev, next) => {
        prev += +next.weight;
        return prev;
      }, 0);
      return {
        ...state,
        averageWeight: (totalWeight / action.payload.persons.length).toFixed(2),
      };
    default:
      return state;
  }
};

export default reducer;
