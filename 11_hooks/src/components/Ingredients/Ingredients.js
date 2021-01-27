import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const onAddIngredient = (ingredient) => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredient },
    ]);
  };

  const onRemoveIngredient = (id) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={onAddIngredient} />

      <section>
        <Search />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={onRemoveIngredient}
        />
      </section>
    </div>
  );
}

export default Ingredients;
