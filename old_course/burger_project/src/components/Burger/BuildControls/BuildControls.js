import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

import { INGREDIENTS } from "../../../containers/BurgerBuilder/BurgerBuilder";

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price: <strong>$ {props.totalPrice.toFixed(2)}</strong>
      </p>
      {Object.keys(INGREDIENTS).map((control) => (
        <BuildControl
          key={control}
          label={INGREDIENTS[control].label}
          addIngredient={() => {
            props.addIngredient(control);
          }}
          removeIngredient={() => {
            props.removeIngredient(control);
          }}
          ingredientDisabled={props.ingredientsDisabled[control]}
        />
      ))}

      <button
        className={classes.OrderButton}
        onClick={props.purchase}
        disabled={!props.purchasable}
      >
        {props.isAuthenticated ? "ORDER NOW!" : "SignIn to continue"}
      </button>
    </div>
  );
};

export default BuildControls;
