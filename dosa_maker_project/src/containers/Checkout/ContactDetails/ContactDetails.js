import React, { Component } from "react";
import axios from "../../../axios/axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactDetails.module.css";

export default class ContactDetails extends Component {
  state = {
    loading: false,
  };

  placeOrder = () => {
    this.setState((prevState) => {
      return { loading: true };
    });
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
        this.setState({ modalState: false, loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ modalState: false, loading: false });
      });
  };

  render() {
    return (
      <div className={classes.ContactDetails}>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <>
            <h1>Contact Details</h1>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your name here.."
            />
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Your address here.."
            />
            <Button type="Success" click={this.placeOrder}>
              Place Order
            </Button>
          </>
        )}
      </div>
    );
  }
}
