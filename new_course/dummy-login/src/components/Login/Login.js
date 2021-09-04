import { useContext, useReducer, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/authContext";
import { Input } from "../UI/Input/Input";

const SET_EMAIL = "SET_EMAIL";
const SET_PASSWORD = "SET_PASSWORD";
const SET_FORM_VALIDITY = "SET_FORM_VALIDITY";

const emailReducer = (state, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.email,
        emailIsValid: state.email.includes("@"),
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.password,
        passwordIsValid: state.password.length > 6,
      };
    case SET_FORM_VALIDITY:
      return {
        ...state,
        formIsValid: state.passwordIsValid && state.emailIsValid,
      };
    default:
      return state;
  }
};

const Login = (props) => {
  const [state, dispatch] = useReducer(emailReducer, {
    email: "",
    emailIsValid: false,
    password: "",
    passwordIsValid: false,
    formIsValid: false,
  });
  const ctx = useContext(AuthContext);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const checkFormValidity = () => {
    dispatch({ type: SET_FORM_VALIDITY });
  };

  const emailChangeHandler = (event) => {
    dispatch({ type: SET_EMAIL, email: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: SET_PASSWORD, password: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (state.formIsValid) {
      ctx.onLogin(state.email, state.password);
    } else if (!state.emailIsValid) {
      emailRef.current.focus();
    } else if (!state.passwordIsValid) {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          inputRef={emailRef}
          type="email"
          id="email"
          value={state.email}
          onChange={emailChangeHandler}
          onBlur={checkFormValidity}
          label="Email"
          className={`${classes.control} ${
            !state.emailIsValid ? classes.invalid : ""
          }`}
        />
        <Input
          type="password"
          inputRef={passwordRef}
          id="password"
          value={state.password}
          onChange={passwordChangeHandler}
          onBlur={checkFormValidity}
          label="Password"
          className={`${classes.control} ${
            !state.passwordIsValid ? classes.invalid : ""
          }`}
        />
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            // disabled={!state.formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
