import React, { Component } from "react";
import axios from "../../../axios/axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactDetails.module.css";
import Input from "../../../components/UI/Input/Input";

export default class ContactDetails extends Component {
  state = {
    loading: false,
    formIsValid: false,
    orderForm: {
      name: {
        type: "input",
        value: "",
        elementConfig: {
          type: "text",
          name: "name",
          id: "name",
          placeholder: "Your Name",
        },
        validation: {
          valid: false,
          touched: false,
          errorMessage: "Please Enter Your Name here...",
          rules: {
            required: true,
          },
        },
      },
      address: {
        type: "textarea",
        value: "",
        elementConfig: {
          name: "address",
          id: "address",
          placeholder: "Your Address",
        },
        validation: {
          valid: false,
          touched: false,
          errorMessage: "Please Enter Your Address here...",
          rules: {
            required: true,
          },
        },
      },
      pinCode: {
        type: "input",
        value: "",
        elementConfig: {
          type: "number",
          name: "pinCode",
          id: "pinCode",
          placeholder: "Your PIN Code",
        },
        validation: {
          valid: false,
          touched: false,
          errorMessage: "Please Enter Your PIN Code here...",
          rules: {
            required: true,
            minLength: 5,
            maxLength: 7,
          },
        },
      },
      deliveryMethod: {
        type: "select",
        value: "fastest",
        elementConfig: {
          name: "deliveryMethod",
          id: "deliveryMethod",
        },
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
        validation: {
          valid: true,
          touched: false,
          rules: {},
        },
      },
    },
  };

  validateRules = (value, rules) => {
    if (rules.required && value.trim().length <= 0) {
      return false;
    }
    if (rules.minLength && rules.minLength > value.trim().length) {
      return false;
    }
    if (rules.maxLength && rules.maxLength < value.trim().length) {
      return false;
    }
    return true;
  };

  inputChangeHandler = (event, key) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormItem = { ...updatedOrderForm[key] };
    updatedFormItem.value = event.target.value;
    updatedFormItem.validation.touched = true;
    updatedFormItem.validation.valid = this.validateRules(
      event.target.value,
      updatedFormItem.validation.rules
    );
    updatedOrderForm[key] = updatedFormItem;
    const formIsValid = Object.keys(updatedOrderForm).reduce((prev, next) => {
      return prev && updatedOrderForm[next].validation.valid;
    }, true);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  placeOrder = () => {
    this.setState((prevState) => {
      return { loading: true };
    });
    const contactDetails = Object.keys(this.state.orderForm).reduce(
      (prev, next) => {
        prev[next] = this.state.orderForm[next].value;
        return prev;
      },
      {}
    );
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      contactDetails: contactDetails,
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
    const inputElements = Object.keys(this.state.orderForm).map((key) => (
      <Input
        key={key}
        type={this.state.orderForm[key].type}
        elementConfig={this.state.orderForm[key].elementConfig}
        touched={this.state.orderForm[key].validation.touched}
        invalid={!this.state.orderForm[key].validation.valid}
        changeHandler={(event) => this.inputChangeHandler(event, key)}
        options={this.state.orderForm[key].options}
        errorMessage={this.state.orderForm[key].validation.errorMessage}
      />
    ));

    return (
      <div className={classes.ContactDetails}>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <>
            <h1>Contact Details</h1>
            {inputElements}
            <Button
              disabled={!this.state.formIsValid}
              type="Success"
              click={this.placeOrder}
            >
              Place Order
            </Button>
          </>
        )}
      </div>
    );
  }
}
