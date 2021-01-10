import React, { Component } from "react";

import classes from "./ContactDetails.module.css";
import axios from "../../../axios/axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

export default class ContactDetails extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    pincode: "",
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        id: 1,
        name: "Maran Sowthri Kalailingam",
        address: {
          street: "1/99 Test Street",
          zipCode: "600001",
          country: "India",
        },
        email: "maran@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => this.setState({ loading: false }));
  };

  render() {
    let form = null;
    if (this.state.loading) {
      form = <Spinner />;
    } else {
      form = (
        <>
          <div className={classes.FormField}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" placeholder="Mike" />
          </div>
          <div className={classes.FormField}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="someone@example.com"
            />
          </div>
          <div className={classes.FormField}>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" />
          </div>
          <div className={classes.FormField}>
            <label htmlFor="pin">Pin Code</label>
            <input type="number" name="pin" id="pin" />
          </div>
          <div className={classes.Submit}>
            <Button btnType="Success" click={this.orderHandler}>
              Place Order
            </Button>
          </div>
        </>
      );
    }
    return (
      <div className={classes.ContactDetails}>
        <h3>Shipping Details</h3>
        <form>{form}</form>
      </div>
    );
  }
}
