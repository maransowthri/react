import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./ContactDetails.module.css";
import axios from "../../../axios/axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { validateRules } from "../../../shared/validation";

function ContactDetails(props) {
  const [orderForm, setOrderForm] = useState({
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
  });
  const [formValidity, setFormValidity] = useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
    const orderData = Object.keys(orderForm).reduce((prev, next) => {
      prev[next] = orderForm[next].value;
      return prev;
    }, {});
    const order = {
      ingredients: props.ingredients,
      totalPrice: props.totalPrice,
      orderData: orderData,
      userID: props.userID,
    };
    props.onPlaceOrder(order, props.token);
  };

  const inputChangedHandler = (event, key) => {
    const updatedOrderForm = { ...orderForm };
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
      updatedInput.validation.valid = validateRules(
        updatedInput.value,
        updatedInput.validation.rules
      );
    }
    updatedOrderForm[key] = updatedInput;
    setOrderForm(updatedOrderForm);
    setFormValidity(formIsValid);
  };

  let form = null;
  if (props.loading) {
    form = <Spinner />;
  } else {
    const inputEls = Object.keys(orderForm).map((key) => (
      <Input
        key={key}
        label={orderForm[key].label}
        elementType={orderForm[key].elementType}
        elementConfig={orderForm[key].elementConfig}
        value={orderForm[key].value}
        errorMessage={
          orderForm[key].validation
            ? orderForm[key].validation.errorMessage
            : null
        }
        touched={
          orderForm[key].validation ? orderForm[key].validation.touched : false
        }
        valid={
          orderForm[key].validation ? orderForm[key].validation.valid : true
        }
        changed={(event) => inputChangedHandler(event, key)}
      />
    ));
    form = (
      <>
        {inputEls}
        <div className={classes.Submit}>
          <Button btnType="Success" disabled={!formValidity}>
            Place Order
          </Button>
        </div>
      </>
    );
  }
  return (
    <div className={classes.ContactDetails}>
      <h3>Shipping Details</h3>
      <form onSubmit={orderHandler}>{form}</form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlaceOrder: (order, token) => dispatch(actions.placeOrder(order, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactDetails, axios));
