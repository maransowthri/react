import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./ContactDetails.module.css";
import axios from "../../../axios/axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactDetails extends Component {
  state = {
    formIsValid: false,
    orderForm: {
      name: {
        elementType: "input",
        label: "Name",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          valid: false,
          touched: false,
          errorMessage: "Please input your name.",
          rules: {
            required: true,
          },
        },
      },
      email: {
        elementType: "input",
        label: "Email",
        elementConfig: {
          type: "text",
          placeholder: "someone@example.com",
        },
        value: "",
        validation: {
          valid: false,
          touched: false,
          errorMessage: "Please enter valid mail",
          rules: {
            required: true,
          },
        },
      },
      address: {
        elementType: "input",
        label: "Address",
        elementConfig: {
          type: "text",
          placeholder: "Address...",
        },
        value: "",
        validation: {
          valid: false,
          touched: false,
          errorMessage: "Please enter your address here.",
          rules: {
            required: true,
          },
        },
      },
      pin: {
        elementType: "input",
        label: "PIN Code",
        elementConfig: {
          type: "text",
          placeholder: "XXXXXX",
        },
        value: "",
        validation: {
          valid: false,
          touched: false,
          errorMessage: "Please enter your PIN Code here.",
          rules: {
            required: true,
            minLength: 5,
            maxLength: 7,
          },
        },
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
  };

  validateRules(value, rules) {
    if (rules.required) {
      if (value.trim().length <= 0) {
        return false;
      }
    }
    if (rules.minLength) {
      if (value.trim().length < rules.minLength) {
        return false;
      }
    }

    if (rules.maxLength) {
      if (value.trim().length > rules.maxLength) {
        return false;
      }
    }
    return true;
  }

  orderHandler = (e) => {
    e.preventDefault();
    const orderData = Object.keys(this.state.orderForm).reduce((prev, next) => {
      prev[next] = this.state.orderForm[next].value;
      return prev;
    }, {});
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: orderData,
    };
    this.props.onPlaceOrder(order);
  };

  inputChangedHandler = (event, key) => {
    const updatedOrderForm = { ...this.state.orderForm };
    let formIsValid = true;
    for (let key in updatedOrderForm) {
      if (
        updatedOrderForm[key].validation &&
        !updatedOrderForm[key].validation.valid
      ) {
        formIsValid = false;
        break;
      }
    }
    const updatedInput = updatedOrderForm[key];
    updatedInput.value = event.target.value;
    if (updatedInput.validation) {
      updatedInput.validation.touched = true;
      updatedInput.validation.valid = this.validateRules(
        updatedInput.value,
        updatedInput.validation.rules
      );
    }
    updatedOrderForm[key] = updatedInput;
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    let form = null;
    if (this.props.loading) {
      form = <Spinner />;
    } else {
      const inputEls = Object.keys(this.state.orderForm).map((key) => (
        <Input
          key={key}
          label={this.state.orderForm[key].label}
          elementType={this.state.orderForm[key].elementType}
          elementConfig={this.state.orderForm[key].elementConfig}
          value={this.state.orderForm[key].value}
          errorMessage={
            this.state.orderForm[key].validation
              ? this.state.orderForm[key].validation.errorMessage
              : null
          }
          touched={
            this.state.orderForm[key].validation
              ? this.state.orderForm[key].validation.touched
              : false
          }
          valid={
            this.state.orderForm[key].validation
              ? this.state.orderForm[key].validation.valid
              : true
          }
          changed={(event) => this.inputChangedHandler(event, key)}
        />
      ));
      form = (
        <>
          {inputEls}
          <div className={classes.Submit}>
            <Button btnType="Success" disabled={!this.state.formIsValid}>
              Place Order
            </Button>
          </div>
        </>
      );
    }
    return (
      <div className={classes.ContactDetails}>
        <h3>Shipping Details</h3>
        <form onSubmit={this.orderHandler}>{form}</form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlaceOrder: (order) => dispatch(actions.placeOrder(order)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactDetails, axios));
