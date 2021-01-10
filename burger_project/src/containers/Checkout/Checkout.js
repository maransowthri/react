import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Burger/Order/CheckoutSummary/CheckoutSummary";
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
    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  }

  componentDidUpdate() {
    // console.log("Component updated");
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    // this.props.history.goback();
    // alert("Order Placed!");
    this.props.history.replace(this.props.match.path + "/contact-details");
  };

  render() {
    return (
      <div>
        {this.state.ingredients ? (
          <>
            <CheckoutSummary
              checkoutCancelHandler={this.checkoutCancelHandler}
              ingredients={this.state.ingredients}
              checkoutContinueHandler={this.checkoutContinueHandler}
            />
            <Route
              path={this.props.match.path + "/contact-details"}
              render={(props) => (
                <ContactDetails
                  {...props}
                  ingredients={this.state.ingredients}
                  totalPrice={this.state.totalPrice}
                />
              )}
            />
          </>
        ) : null}
      </div>
    );
  }
}
