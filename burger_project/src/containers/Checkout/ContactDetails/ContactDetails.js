import React, { Component } from "react";

import classes from "./ContactDetails.module.css";
import axios from "../../../axios/axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

export default class ContactDetails extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        label: "Name",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        label: "Email",
        elementConfig: {
          type: "text",
          placeholder: "someone@example.com",
        },
        value: "",
      },
      address: {
        elementType: "input",
        label: "Address",
        elementConfig: {
          type: "text",
          placeholder: "Address...",
        },
        value: "",
      },
      pin: {
        elementType: "input",
        label: "PIN Code",
        elementConfig: {
          type: "text",
          placeholder: "XXXXXX",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        label: "Delivery Type",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
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

  inputChangedHandler = (event, key) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedInput = updatedOrderForm[key];
    updatedInput.value = event.target.value;
    updatedOrderForm[key] = updatedInput;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    let form = null;
    if (this.state.loading) {
      form = <Spinner />;
    } else {
      const inputEls = Object.keys(this.state.orderForm).map((key) => (
        <Input
          key={key}
          label={this.state.orderForm[key].label}
          elementType={this.state.orderForm[key].elementType}
          elementConfig={this.state.orderForm[key].elementConfig}
          value={this.state.orderForm[key].value}
          changed={(event) => this.inputChangedHandler(event, key)}
        />
      ));
      form = (
        <>
          {inputEls}
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
