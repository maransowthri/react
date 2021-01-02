import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

export const INGREDIENTS = {
  salad: { label: "Salad", unitPrice: 0.4 },
  bacon: { label: "Bacon", unitPrice: 0.7 },
  cheese: { label: "Cheese", unitPrice: 0.5 },
  meat: { label: "Meat", unitPrice: 1.3 },
};

const stateIngredients = Object.keys(INGREDIENTS).reduce((prev, current) => {
  prev[current] = 0;
  return prev;
}, {});

class BurgerBuilder extends Component {
  state = {
    ingredients: stateIngredients,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  addIngredient = (type) => {
    let oldCount = this.state.ingredients[type];
    let oldPrice = this.state.totalPrice;
    let updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = oldCount + 1;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: oldPrice + INGREDIENTS[type].unitPrice,
    });
    this.updatePurchasable(updatedIngredients);
  };

  removeIngredient = (type) => {
    let oldCount = this.state.ingredients[type];

    if (oldCount === 0) {
      return;
    }

    let oldPrice = this.state.totalPrice;
    let updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = oldCount - 1;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: oldPrice - INGREDIENTS[type].unitPrice,
    });
    this.updatePurchasable(updatedIngredients);
  };

  updatePurchasable = (ingredients) => {
    const ingredientsSum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((prev, current) => prev + current);
    this.setState({ purchasable: ingredientsSum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("Order placed!");
  };

  render() {
    let ingredientsDisabled = { ...this.state.ingredients };

    for (let key in ingredientsDisabled) {
      ingredientsDisabled[key] = ingredientsDisabled[key] === 0;
    }

    return (
      <>
        <Modal show={this.state.purchasing} close={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          ingredientsDisabled={ingredientsDisabled}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchase={this.purchaseHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
