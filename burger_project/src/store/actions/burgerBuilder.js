import * as actionTypes from "./actionTypes";

export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: { ingredient: ingredient },
  };
};

export const removeIngredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: { ingredient: ingredient },
  };
};

export const fetchIngredientsInProgress = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_INPROGRESS,
  };
};

export const fetchIngredientsSuccess = (ingredients) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
    payload: { ingredients: ingredients },
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const preservedIngredientsSuccess = (ingredients, totalPrice) => {
  return {
    type: actionTypes.PRESERVED_INGREDINETS_SUCCESS,
    payload: { ingredients, totalPrice },
  };
};

export const setPreserveIngredients = () => {
  return {
    type: actionTypes.SET_PRESERVE_INGREDIENTS,
  };
};

export const fetchIngredients = (
  preserveIngredients,
  ingredients,
  totalPrice
) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_INIT,
    payload: { preserveIngredients, ingredients, totalPrice },
  };
};
