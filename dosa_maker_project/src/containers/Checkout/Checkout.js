import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Checkout.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import CheckoutSummary from "../../components/Dosa/CheckoutSummary/CheckoutSummary";
import ContactDetails from "./ContactDetails/ContactDetails";

class Checkout extends Component {
  state = {
    loading: false,
  };

  cancelOrder = () => {
    this.props.history.goBack();
  };

  placeOrder = () => {
    this.props.history.replace(this.props.match.path + "/contact-details");
  };

  render() {
    let checkout = null;
    if (this.state.loading) {
      checkout = <Spinner />;
    } else {
      checkout = (
        <>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            cancelOrder={this.cancelOrder}
            placeOrder={this.placeOrder}
          />
          <Route
            path={this.props.match.path + "/contact-details"}
            component={ContactDetails}
          />
        </>
      );
    }
    return <div className={classes.Checkout}>{checkout}</div>;
  }
}

const mapStateToProps = (state) => {
  return { ingredients: state.ingredients };
};

export default connect(mapStateToProps)(Checkout);
