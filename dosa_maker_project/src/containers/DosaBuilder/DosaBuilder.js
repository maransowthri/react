import React, { Component } from "react";

import DosaIngredients from "../../components/Dosa/DosaIngredients/DosaIngredients";
import DosaControls from "../../components/Dosa/DosaControls/DosaControls";
import OrderSummary from "../../components/Dosa/DosaControls/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";

export const INGREDINETS = {
  cheese: { label: "Cheese", unitPrice: 1.2 },
  mushroom: { label: "Mushroom", unitPrice: 0.5 },
};

const stateIngredients = Object.keys(INGREDINETS).reduce((prev, current) => {
  prev[current] = 0;
  return prev;
}, {});

class DosaBuilder extends Component {
  state = {
    ingredients: stateIngredients,
    totalPrice: 1,
    modalState: false,
  };

  addIngredient = (type) => {
    const ingredients = { ...this.state.ingredients };
    let oldCount = ingredients[type];
    ingredients[type] = oldCount + 1;
    this.setState({ ingredients });
    this.updatePrice(type, 1);
  };

  removeIngredient = (type) => {
    const ingredients = { ...this.state.ingredients };
    let oldCount = ingredients[type];
    if (oldCount === 0) {
      return;
    }
    ingredients[type] = oldCount - 1;
    this.setState({ ingredients });
    this.updatePrice(type, -1);
  };

  updatePrice = (ingredient, addRemove) => {
    let oldPrice = this.state.totalPrice;
    let unitPrice = INGREDINETS[ingredient].unitPrice * addRemove;
    this.setState({ totalPrice: oldPrice + unitPrice });
  };

  modalHandler = () => {
    this.setState((prevState) => {
      return { modalState: !prevState.modalState };
    });
  };

  render() {
    return (
      <>
        <Modal state={this.state.modalState}>
          <OrderSummary
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            modalHandler={this.modalHandler}
          />
        </Modal>
        <DosaIngredients ingredients={this.state.ingredients} />
        <DosaControls
          totalPrice={this.state.totalPrice}
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          modalHandler={this.modalHandler}
        />
      </>
    );
  }
}

export default DosaBuilder;
