import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

export const INGREDIENTS = {
  salad: { label: "Salad", unitPrice: 0.4 },
  bacon: { label: "Bacon", unitPrice: 0.7 },
  cheese: { label: "Cheese", unitPrice: 0.5 },
  meat: { label: "Meat", unitPrice: 1.3 },
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.payload.ingredient]:
      state.ingredients[action.payload.ingredient] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: +(
      state.totalPrice + INGREDIENTS[action.payload.ingredient].unitPrice
    ).toFixed(2),
  });
  return updatedState;
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.payload.ingredient]:
      state.ingredients[action.payload.ingredient] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: +(
      state.totalPrice - INGREDIENTS[action.payload.ingredient].unitPrice
    ).toFixed(2),
  });
  return updatedState;
};

const fetchIngredientsSuccess = (state, action) => {
  return updateObject(state, {
    ingredients: action.payload.ingredients,
    error: false,
    totalPrice: 4,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.FETCH_INGREDIENTS_SUCCESS:
      return fetchIngredientsSuccess(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
