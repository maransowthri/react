import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Burger/Order/CheckoutSummary/CheckoutSummary";
import ContactDetails from "./ContactDetails/ContactDetails";

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
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ingredients: state.ingredients };
};

export default connect(mapStateToProps)(Checkout);
