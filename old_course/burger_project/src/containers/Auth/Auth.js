import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios/axios-auth";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import Alert from "../../components/UI/Alert/Alert";
import { validateRules } from "../../shared/validation";

function Auth(props) {
  const [authType, setAuthType] = useState("");
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      label: "Email",
      elementConfig: {
        type: "email",
        placeholder: "someone@example.com",
      },
      value: "",
      validation: {
        valid: false,
        touched: false,
        errorMessage: "Please input your mail ID.",
        rules: {
          required: true,
          isEmail: true,
        },
      },
    },
    password: {
      elementType: "input",
      label: "Password",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        valid: false,
        touched: false,
        errorMessage: "Please enter your password.",
        rules: {
          required: true,
          minLength: 6,
        },
      },
    },
  });
  const { showAlert, onRemoveAlert } = props;

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        onRemoveAlert();
      }, 3000);
    }
  }, [showAlert, onRemoveAlert]);

  const onSignupHandler = (event) => {
    setAuthType(actions.SIGNUP);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, authType);
  };

  const onSignInHandler = (event) => {
    setAuthType(actions.SIGNIN);
  };

  const inputChangedHandler = (event, key) => {
    const updatedControls = {
      ...controls,
      [key]: {
        ...controls[key],
        value: event.target.value,
        validation: {
          ...controls[key].validation,
          valid: validateRules(
            event.target.value,
            controls[key].validation.rules
          ),
          touched: true,
        },
      },
    };
    setControls(updatedControls);
  };

  const inputEls = props.loading ? (
    <Spinner />
  ) : (
    Object.keys(controls).map((key) => (
      <Input
        key={key}
        label={controls[key].label}
        elementType={controls[key].elementType}
        elementConfig={controls[key].elementConfig}
        value={controls[key].value}
        errorMessage={
          controls[key].validation
            ? controls[key].validation.errorMessage
            : null
        }
        touched={
          controls[key].validation ? controls[key].validation.touched : false
        }
        valid={controls[key].validation ? controls[key].validation.valid : true}
        changed={(event) => inputChangedHandler(event, key)}
      />
    ))
  );

  let redirect = props.isAuthenticated ? <Redirect to="/" /> : null;

  return (
    <>
      {redirect}
      <div className={classes.Auth}>
        <Button click={(event) => onSignInHandler(event)} btnType="Success">
          Sign In
        </Button>
        <Button click={(event) => onSignupHandler(event)} btnType="Danger">
          Signup
        </Button>
        <h3>{authType === actions.SIGNUP ? "Signup" : "SignIn"}</h3>
        {props.showAlert && <Alert message={props.alertMessage} />}
        {props.error ? <p>{props.error}</p> : null}
        <>
          {inputEls}
          <Button click={(event) => onSubmitHandler(event)} btnType="Success">
            Submit
          </Button>
        </>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    showAlert: state.auth.showAlert,
    alertMessage: state.auth.alertMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, type) =>
      dispatch(actions.auth(email, password, type)),
    onRemoveAlert: () => dispatch(actions.removeAlert()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axios));
