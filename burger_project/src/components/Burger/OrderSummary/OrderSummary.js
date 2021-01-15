import React, { Component } from "react";

import { INGREDIENTS } from "../../../containers/BurgerBuilder/BurgerBuilder";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredients = Object.keys(this.props.ingredients).map((key) => (
      <li key={key}>
        {INGREDIENTS[key].label}: {this.props.ingredients[key]}
      </li>
    ));
    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients.</p>
        <ul>{ingredients}</ul>
        <p>
          Total Price: <strong>$ {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button click={this.props.continuePurchase} btnType="Success">
          CONTINUE
        </Button>
        <Button click={this.props.cancelPurchase} btnType="Danger">
          CANCEL
        </Button>
      </>
    );
  }
}

export default OrderSummary;
