import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const Burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
    .map((item) =>
      [...Array(props.ingredients[item])].map((_, i) => (
        <BurgerIngredient key={item + i} type={item} />
      ))
    )
    .reduce((prev, cur) => {
      return prev.concat(cur);
    });

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients.</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
