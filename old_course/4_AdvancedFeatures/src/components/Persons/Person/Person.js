import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./Person.module.css";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   console.log("[Person.js] getDerivedStateFromProps ", props);
  //   return state;
  // }

  constructor(props) {
    super(props);
    this.inputElRef = React.createRef();
  }

  static contextType = AuthContext;

  shouldComponentUpdate(nextProps, nextState) {
    console.log(
      "[Person.js] getDerivedStateFromProps Next Props",
      nextProps,
      " Next State ",
      nextState
    );
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(
      "[Person.js] getSnapshotBeforeUpdate Prev Props",
      prevProps,
      " Prev State ",
      prevState
    );
    return { message: "Snapshot!" };
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log("[Person.js] componentDidUpdate", snapShot);
  }

  componentDidMount() {
    this.inputElRef.current.focus();
  }

  render() {
    console.log("[Person.js] render called");

    return (
      <div className={classes.Person}>
        {this.context.loggedIn ? <p>Authenticated!</p> : <p>Please login.</p>}

        <input
          type="text"
          value={this.props.name}
          onChange={this.props.update}
          ref={this.inputElRef}
        />
        <p>
          {this.props.name} is {this.props.age} years old.{" "}
          <span onClick={this.props.delete}>X</span>
        </p>
      </div>
    );
  }
}

Person.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  delete: PropTypes.func,
  update: PropTypes.func,
};

export default Person;
