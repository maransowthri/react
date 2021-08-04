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

export const fetchIngredientsInit = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_INIT,
  };
};

const fetchIngredientsInProgress = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_INPROGRESS,
  };
};

const fetchIngredientsSuccess = (ingredients) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
    payload: { ingredients },
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const fetchIngredients = (preserveIngredients) => {
  return (dispatch) => {
    if (preserveIngredients) {
      dispatch(removePreserveIngredients());
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

export const setPreserveingredients = () => {
  return {
    type: actionTypes.SET_PRESERVE_INGREDIENTS,
  };
};

const removePreserveIngredients = () => {
  return {
    type: actionTypes.REMOVE_PRESERVE_INGREDIENTS,
  };
};
