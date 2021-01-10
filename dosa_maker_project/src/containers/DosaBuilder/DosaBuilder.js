import React, { Component } from "react";

import axios from "../../axios/axios-orders";

import DosaIngredients from "../../components/Dosa/DosaIngredients/DosaIngredients";
import DosaControls from "../../components/Dosa/DosaControls/DosaControls";
import OrderSummary from "../../components/Dosa/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export const INGREDINETS = {
  cheese: { label: "Cheese", unitPrice: 1.2 },
  mushroom: { label: "Mushroom", unitPrice: 0.5 },
};

class DosaBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 1,
    modalState: false,
    loading: false,
  };

  componentDidMount() {
    axios.get("ingredients.json").then((res) => {
      this.setState({ ingredients: res.data });
    });
  }

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

  orderedHandler = () => {
    const searchParams = Object.keys(this.state.ingredients).map(
      (key) =>
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(this.state.ingredients[key])
    );
    searchParams.push("price=" + this.state.totalPrice.toFixed(2));
    this.props.history.push({
      pathname: "/checkout",
      search: searchParams.join("&"),
    });
  };

  render() {
    let burger = null;
    let summary = null;

    if (this.state.ingredients) {
      burger = (
        <>
          <DosaIngredients ingredients={this.state.ingredients} />
          <DosaControls
            totalPrice={this.state.totalPrice}
            addIngredient={this.addIngredient}
            removeIngredient={this.removeIngredient}
            modalHandler={this.modalHandler}
          />
        </>
      );
      summary = (
        <OrderSummary
          totalPrice={this.state.totalPrice}
          ingredients={this.state.ingredients}
          orderedHandler={this.orderedHandler}
          modalHandler={this.modalHandler}
        />
      );
    } else {
      burger = <Spinner />;
    }

    if (this.state.loading) {
      summary = <Spinner />;
    }

    return (
      <>
        <Modal click={this.modalHandler} state={this.state.modalState}>
          {summary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(DosaBuilder, axios);
