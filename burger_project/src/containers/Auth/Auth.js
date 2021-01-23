import React, { Component } from "react";
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

class Auth extends Component {
  state = {
    authType: "",
    controls: {
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
    },
  };

  onSignupHandler = (event) => {
    this.setState({ authType: actions.SIGNUP });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.authType
    );
  };

  onSignInHandler = (event) => {
    this.setState({ authType: actions.SIGNIN });
  };

  inputChangedHandler = (event, key) => {
    const updatedControls = {
      ...this.state.controls,
      [key]: {
        ...this.state.controls[key],
        value: event.target.value,
        validation: {
          ...this.state.controls[key].validation,
          valid: validateRules(
            event.target.value,
            this.state.controls[key].validation.rules
          ),
          touched: true,
        },
      },
    };
    this.setState({ controls: updatedControls });
  };

  render() {
    const inputEls = this.props.loading ? (
      <Spinner />
    ) : (
      Object.keys(this.state.controls).map((key) => (
        <Input
          key={key}
          label={this.state.controls[key].label}
          elementType={this.state.controls[key].elementType}
          elementConfig={this.state.controls[key].elementConfig}
          value={this.state.controls[key].value}
          errorMessage={
            this.state.controls[key].validation
              ? this.state.controls[key].validation.errorMessage
              : null
          }
          touched={
            this.state.controls[key].validation
              ? this.state.controls[key].validation.touched
              : false
          }
          valid={
            this.state.controls[key].validation
              ? this.state.controls[key].validation.valid
              : true
          }
          changed={(event) => this.inputChangedHandler(event, key)}
        />
      ))
    );

    let redirect = this.props.isAuthenticated ? <Redirect to="/" /> : null;
    let alert = null;
    if (this.props.showAlert) {
      alert = <Alert message={this.props.alertMessage} />;
      setTimeout(() => {
        this.props.onRemoveAlert();
      }, 5000);
    }

    return (
      <>
        {redirect}
        <div className={classes.Auth}>
          <Button
            click={(event) => this.onSignInHandler(event)}
            btnType="Success"
          >
            Sign In
          </Button>
          <Button
            click={(event) => this.onSignupHandler(event)}
            btnType="Danger"
          >
            Signup
          </Button>
          <h3>
            {this.state.authType === actions.SIGNUP ? "Signup" : "SignIn"}
          </h3>
          {alert}
          {this.props.error ? <p>{this.props.error}</p> : null}
          <>
            {inputEls}
            <Button
              click={(event) => this.onSubmitHandler(event)}
              btnType="Success"
            >
              Submit
            </Button>
          </>
        </div>
      </>
    );
  }
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
