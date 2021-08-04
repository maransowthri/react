import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { validateRules } from "../../shared/validation";

class Auth extends Component {
  state = {
    form: {
      email: {
        type: "input",
        value: "",
        elementConfig: {
          type: "email",
          name: "email",
          id: "email",
          placeholder: "Your Email",
        },
        validation: {
          valid: false,
          touched: false,
          errorMessage: "Please Enter Your Email here...",
          rules: {
            required: true,
            isEmail: true,
          },
        },
      },
      password: {
        type: "input",
        value: "",
        elementConfig: {
          type: "password",
          name: "password",
          id: "password",
          placeholder: "****",
        },
        validation: {
          valid: false,
          touched: false,
          errorMessage: "Please Enter Your Password here...",
          rules: {
            required: true,
            minLength: 6,
          },
        },
      },
    },
    type: actions.SIGNIN,
  };

  signInHandler = () => {
    this.setState({ type: actions.SIGNIN });
  };

  signupHandler = () => {
    this.setState({ type: actions.SIGNUP });
  };

  inputChangeHandler = (event, key) => {
    const updatedForm = { ...this.state.form };
    const updatedItem = { ...updatedForm[key] };
    updatedItem.value = event.target.value;
    updatedItem.validation.touched = true;
    updatedItem.validation.valid = validateRules(
      event.target.value,
      updatedItem.validation.rules
    );
    updatedForm[key] = updatedItem;
    this.setState({ form: updatedForm });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.form.email.value,
      this.state.form.password.value,
      this.state.type
    );
  };

  render() {
    const inputElements = Object.keys(this.state.form).map((key) => (
      <Input
        key={key}
        type={this.state.form[key].type}
        elementConfig={this.state.form[key].elementConfig}
        touched={this.state.form[key].validation.touched}
        invalid={!this.state.form[key].validation.valid}
        changeHandler={(event) => this.inputChangeHandler(event, key)}
        options={this.state.form[key].options}
        errorMessage={this.state.form[key].validation.errorMessage}
      />
    ));
    const form = this.props.loading ? (
      <Spinner />
    ) : (
      <form>
        {inputElements}
        <Button click={(event) => this.submitHandler(event)} type="Secondary">
          Submit
        </Button>
      </form>
    );
    return (
      <>
        {this.props.isAuthenticated ? <Redirect to="/" /> : null}
        <div className={classes.Auth}>
          <Button click={this.signupHandler} type="Primary">
            Signup
          </Button>
          <Button click={this.signInHandler} type="Success">
            SignIn
          </Button>
          <h3>{this.state.type === actions.SIGNIN ? "SignIn" : "Signup"}</h3>
          {form}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, type) =>
      dispatch(actions.auth(email, password, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
