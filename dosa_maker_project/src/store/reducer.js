import * as actionTypes from "./actions";

export const INGREDINETS = {
  cheese: { label: "Cheese", unitPrice: 1.2 },
  mushroom: { label: "Mushroom", unitPrice: 0.5 },
};

const initialState = {
  ingredients: { cheese: 0, mushroom: 0 },
  totalPrice: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredient]:
            state.ingredients[action.payload.ingredient] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDINETS[action.payload.ingredient].unitPrice,
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredient]:
            state.ingredients[action.payload.ingredient] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDINETS[action.payload.ingredient].unitPrice,
      };

    default:
      return state;
  }
};

export default reducer;
