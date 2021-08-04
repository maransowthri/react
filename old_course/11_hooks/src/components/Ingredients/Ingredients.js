import React, { useCallback, useReducer, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http";

const ingredientsReducer = (ingredients, action) => {
  switch (action.type) {
    case "SET":
      return action.payload.ingredients;
    case "ADD":
      return ingredients.concat(action.payload.ingredient);
    case "REMOVE":
      return ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    default:
      return ingredients;
  }
};

function Ingredients() {
  const [ingredients, ingredientsDispatch] = useReducer(ingredientsReducer, []);
  const {
    loading,
    error,
    sendRequest,
    data,
    identifier,
    id,
    clearState,
  } = useHttp();

  console.log(identifier);

  const onAddIngredient = useCallback(
    (ingredient) => {
      sendRequest(
        "https://react-hooks-project-12c23-default-rtdb.firebaseio.com/ingredients.json",
        "POST",
        {
          "Content-Type": "application/json",
        },
        ingredient,
        "ADD"
      );
    },
    [sendRequest]
  );

  useEffect(() => {
    if (identifier === "ADD") {
      ingredientsDispatch({
        type: "ADD",
        payload: { ingredient: { ...data, id } },
      });
    } else if (identifier === "REMOVE") {
      ingredientsDispatch({
        type: "REMOVE",
        payload: { id },
      });
    }
  }, [data, identifier, id]);

  const onFilterIngredients = useCallback((filteredIngredients) => {
    ingredientsDispatch({
      type: "SET",
      payload: { ingredients: filteredIngredients },
    });
  }, []);

  const onRemoveIngredient = useCallback(
    (id) => {
      console.log({ id });
      sendRequest(
        `https://react-hooks-project-12c23-default-rtdb.firebaseio.com/ingredients/${id}.json`,
        "DELETE",
        undefined,
        undefined,
        "REMOVE",
        id
      );
    },
    [sendRequest]
  );

  console.log(error);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearState}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={onAddIngredient} loading={loading} />

      <section>
        <Search filterIngredients={onFilterIngredients} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={onRemoveIngredient}
          loading={loading}
        />
      </section>
    </div>
  );
}

export default Ingredients;
