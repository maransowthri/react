import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import axios from "../../axios/axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export const INGREDIENTS = {
  salad: { label: "Salad", unitPrice: 0.4 },
  bacon: { label: "Bacon", unitPrice: 0.7 },
  cheese: { label: "Cheese", unitPrice: 0.5 },
  meat: { label: "Meat", unitPrice: 1.3 },
};

export class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.props.onFetchIngredients(
      this.props.preserveIngredients,
      this.props.ingredients,
      this.props.totalPrice
    );
  }

  state = {
    purchasing: false,
  };

  updatePurchasable = (ingredients) => {
    const ingredientsSum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((prev, current) => prev + current);
    return ingredientsSum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetPreserveIngredients();
      this.props.onSetAlert("Please login to place your order!");
      this.props.history.push("/login");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    let ingredientsDisabled = null;
    let summary = null;
    let burger = this.props.error ? <p>Something went wrong!</p> : <Spinner />;

    if (this.props.ingredients) {
      ingredientsDisabled = Object.keys(this.props.ingredients).reduce(
        (prev, next) => {
          prev[next] = this.props.ingredients[next] === 0;
          return prev;
        },
        {}
      );
      burger = (
        <>
          <BuildControls
            isAuthenticated={this.props.isAuthenticated}
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

    return (
      <>
        <Modal show={this.state.purchasing} close={this.purchaseCancelHandler}>
          {summary}
        </Modal>
        <Burger ingredients={this.props.ingredients} />
        {burger}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    preserveIngredients: state.burgerBuilder.preserveIngredients,
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredient) =>
      dispatch(actions.addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) =>
      dispatch(actions.removeIngredient(ingredient)),
    onFetchIngredients: (preserveIngredients, ingredients, totalPrice) =>
      dispatch(
        actions.fetchIngredients(preserveIngredients, ingredients, totalPrice)
      ),
    onSetPreserveIngredients: () => dispatch(actions.setPreserveIngredients()),
    onSetAlert: (message) => {
      dispatch(actions.setAlert(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
