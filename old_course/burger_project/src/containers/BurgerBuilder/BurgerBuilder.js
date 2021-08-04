import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

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

function BurgerBuilder(props) {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const preserveIngredients = useSelector(
    (state) => state.burgerBuilder.preserveIngredients
  );
  const isAuthenticated = useSelector((state) => state.auth.token != null);

  const onAddIngredient = (ingredient) =>
    dispatch(actions.addIngredient(ingredient));
  const onRemoveIngredient = (ingredient) =>
    dispatch(actions.removeIngredient(ingredient));
  const onFetchIngredients = useCallback(
    (preserveIngredients) =>
      dispatch(actions.fetchIngredients(preserveIngredients)),
    [dispatch]
  );
  const onSetPreserveIngredients = () =>
    dispatch(actions.setPreserveIngredients());
  const onSetAlert = (message) => {
    dispatch(actions.setAlert(message));
  };

  useEffect(() => {
    onFetchIngredients(preserveIngredients);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchIngredients]);

  const updatePurchasable = (ingredients) => {
    const ingredientsSum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((prev, current) => prev + current);
    return ingredientsSum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetPreserveIngredients();
      onSetAlert("Please login to place your order!");
      props.history.push("/login");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.history.push("/checkout");
  };

  let ingredientsDisabled = null;
  let summary = null;
  let burger = error ? <p>Something went wrong!</p> : <Spinner />;

  if (ingredients) {
    ingredientsDisabled = Object.keys(ingredients).reduce((prev, next) => {
      prev[next] = ingredients[next] === 0;
      return prev;
    }, {});
    burger = (
      <>
        <BuildControls
          isAuthenticated={isAuthenticated}
          addIngredient={onAddIngredient}
          removeIngredient={onRemoveIngredient}
          ingredientsDisabled={ingredientsDisabled}
          totalPrice={totalPrice}
          purchasable={updatePurchasable(ingredients)}
          purchase={purchaseHandler}
        />
      </>
    );
    summary = (
      <OrderSummary
        ingredients={ingredients}
        cancelPurchase={purchaseCancelHandler}
        continuePurchase={purchaseContinueHandler}
        totalPrice={totalPrice}
      />
    );
  }

  return (
    <>
      <Modal show={purchasing} close={purchaseCancelHandler}>
        {summary}
      </Modal>
      <Burger ingredients={ingredients} />
      {burger}
    </>
  );
}

export default withErrorHandler(BurgerBuilder, axios);
