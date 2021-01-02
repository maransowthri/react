import React from "react";

import { INGREDIENTS } from "../../../containers/BurgerBuilder/BurgerBuilder";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((key) => (
    <li key={key}>
      {INGREDIENTS[key].label}: {props.ingredients[key]}
    </li>
  ));
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients.</p>
      <ul>{ingredients}</ul>
      <p>
        Total Price: <strong>$ {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button click={props.continuePurchase} btnType="Success">
        CONTINUE
      </Button>
      <Button click={props.cancelPurchase} btnType="Danger">
        CANCEL
      </Button>
    </>
  );
};

export default OrderSummary;
