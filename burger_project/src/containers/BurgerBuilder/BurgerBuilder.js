import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios/axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

export const INGREDIENTS = {
  salad: { label: "Salad", unitPrice: 0.4 },
  bacon: { label: "Bacon", unitPrice: 0.7 },
  cheese: { label: "Cheese", unitPrice: 0.5 },
  meat: { label: "Meat", unitPrice: 1.3 },
};

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  updatePurchasable = (ingredients) => {
    const ingredientsSum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((prev, current) => prev + current);
    return ingredientsSum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    let ingredientsDisabled = { ...this.props.ingredients };
    for (let key in ingredientsDisabled) {
      ingredientsDisabled[key] = ingredientsDisabled[key] === 0;
    }

    let summary = null;
    let burger = this.state.error ? <p>Something went wrong!</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            ingredientsDisabled={ingredientsDisabled}
            totalPrice={this.props.totalPrice}
            purchasable={this.updatePurchasable(this.props.ingredients)}
            purchase={this.purchaseHandler}
          />
        </>
      );
      summary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          totalPrice={this.props.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      summary = <Spinner />;
    }

    return (
      <>
        <Modal show={this.state.purchasing} close={this.purchaseCancelHandler}>
          {summary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { ingredients: state.ingredients, totalPrice: state.totalPrice };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredient) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingredient: ingredient },
      }),
    onRemoveIngredient: (ingredient) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingredient: ingredient },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
