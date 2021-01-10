import React, { Component } from "react";
import { Route } from "react-router-dom";

import classes from "./Checkout.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import CheckoutSummary from "../../components/Dosa/CheckoutSummary/CheckoutSummary";
import ContactDetails from "./ContactDetails/ContactDetails";

export default class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let item of params) {
      if (item[0] === "price") {
        totalPrice = +item[1];
      } else {
        ingredients[item[0]] = +item[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice,
    });
  }

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
            ingredients={this.state.ingredients}
            cancelOrder={this.cancelOrder}
            placeOrder={this.placeOrder}
          />
          <Route
            path={this.props.match.path + "/contact-details"}
            render={(props) => (
              <ContactDetails
                totalPrice={this.state.totalPrice}
                ingredients={this.state.ingredients}
                {...props}
              />
            )}
          />
        </>
      );
    }
    return <div className={classes.Checkout}>{checkout}</div>;
  }
}
