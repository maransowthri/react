import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Burger/Order/CheckoutSummary/CheckoutSummary";
import ContactDetails from "./ContactDetails/ContactDetails";
import * as actions from "../../store/actions/index";

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace(this.props.match.path + "/contact-details");
  };

  render() {
    return (
      <div>
        {this.props.ingredients ? (
          <>
            {this.props.purchased ? <Redirect to="/" /> : null}
            <CheckoutSummary
              checkoutCancelHandler={this.checkoutCancelHandler}
              ingredients={this.props.ingredients}
              checkoutContinueHandler={this.checkoutContinueHandler}
            />
            <Route
              path={this.props.match.path + "/contact-details"}
              component={ContactDetails}
            />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
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
