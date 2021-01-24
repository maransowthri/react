import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

export const INGREDINETS = {
  cheese: { label: "Cheese", unitPrice: 1.2 },
  mushroom: { label: "Mushroom", unitPrice: 0.5 },
};

const initialState = {
  ingredients: null,
  totalPrice: 0,
  loading: false,
  error: false,
  preserveIngredients: false,
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
      state.totalPrice + INGREDINETS[action.payload.ingredient].unitPrice
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
      state.totalPrice - INGREDINETS[action.payload.ingredient].unitPrice
    ).toFixed(2),
  });
  return updatedState;
};

const fetchIngredientsInProgress = (state, action) => {
  return updateObject(state, { loading: true, error: false, totalPrice: 4 });
};

const fetchIngredientsSuccess = (state, action) => {
  return updateObject(state, {
    ingredients: action.payload.ingredients,
    loading: false,
    preserveIngredients: false,
  });
};

const fetchIngredientsFailed = (state, actions) => {
  return updateObject(state, { loading: false, error: true });
};

const setPreserveIngredients = (state, action) => {
  return updateObject(state, { preserveIngredients: true });
};

const removePreserveIngredients = (state, action) => {
  return updateObject(state, { preserveIngredients: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_INPROGRESS:
      return fetchIngredientsInProgress(state, action);
    case actionTypes.FETCH_INGREDIENTS_SUCCESS:
      return fetchIngredientsSuccess(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    case actionTypes.SET_PRESERVE_INGREDIENTS:
      return setPreserveIngredients(state, action);
    case actionTypes.REMOVE_PRESERVE_INGREDIENTS:
      return removePreserveIngredients(state, action);
    default:
      return state;
  }
};

export default reducer;
