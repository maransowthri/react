import * as actionTypes from "./actions";

const initialState = {
  ingredients: { salad: 0, cheese: 0, bacon: 0, meat: 0 },
  totalPrice: 4,
};

export const INGREDIENTS = {
  salad: { label: "Salad", unitPrice: 0.4 },
  bacon: { label: "Bacon", unitPrice: 0.7 },
  cheese: { label: "Cheese", unitPrice: 0.5 },
  meat: { label: "Meat", unitPrice: 1.3 },
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
          state.totalPrice + INGREDIENTS[action.payload.ingredient].unitPrice,
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
          state.totalPrice - INGREDIENTS[action.payload.ingredient].unitPrice,
      };

    default:
      return state;
  }
};

export default reducer;
