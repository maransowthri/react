import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Burger/Order/CheckoutSummary/CheckoutSummary";
import ContactDetails from "./ContactDetails/ContactDetails";
import * as actions from "../../store/actions/index";

function Checkout(props) {
  const checkoutCancelHandler = () => {
    props.history.goBack();
  };
  console.log(props);

  const checkoutContinueHandler = () => {
    props.history.replace(props.match.path + "/contact-details");
  };

  return (
    <div>
      {props.ingredients ? (
        <>
          {props.purchased ? <Redirect to="/" /> : null}
          <CheckoutSummary
            checkoutCancelHandler={checkoutCancelHandler}
            ingredients={props.ingredients}
            checkoutContinueHandler={checkoutContinueHandler}
          />
          <Route
            path={props.match.path + "/contact-details"}
            component={ContactDetails}
          />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseInit: dispatch(actions.placeOrderInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
