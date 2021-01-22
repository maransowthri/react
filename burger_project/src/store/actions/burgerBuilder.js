import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios-orders";

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

const preservedIngredientsSuccess = (ingredients, totalPrice) => {
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
  return (dispatch) => {
    if (preserveIngredients) {
      dispatch(preservedIngredientsSuccess(ingredients, totalPrice));
    } else {
      dispatch(fetchIngredientsInProgress());
      axios
        .get("ingredients.json")
        .then((res) => {
          dispatch(fetchIngredientsSuccess(res.data));
        })
        .catch((err) => {
          dispatch(fetchIngredientsFailed());
        });
    }
  };
};
