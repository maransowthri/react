import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import axios from "../../../axios/axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactDetails.module.css";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactDetails extends Component {
  state = {
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
    const contactDetails = Object.keys(this.state.orderForm).reduce(
      (prev, next) => {
        prev[next] = this.state.orderForm[next].value;
        return prev;
      },
      {}
    );
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      contactDetails: contactDetails,
      userID: this.props.userID,
    };
    this.props.onPlaceOrder(order);
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

    let summary = <Spinner />;

    if (!this.props.loading) {
      if (this.props.purchased) {
        summary = <Redirect to="/" />;
      } else {
        summary = (
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
        );
      }
    }

    return <div className={classes.ContactDetails}>{summary}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.dosaBuilder.ingredients,
    totalPrice: state.dosaBuilder.totalPrice,
    purchased: state.order.purchased,
    error: state.order.error,
    userID: state.auth.userID,
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
