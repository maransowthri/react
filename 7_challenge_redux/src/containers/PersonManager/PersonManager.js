import React, { Component } from "react";
import { connect } from "react-redux";

import Persons from "../../components/Persons/Persons";
import classes from "./PersonManager.module.css";
import * as actionTypes from "../../store/actions";

class PersonManager extends Component {
  state = {
    name: "",
    weight: "",
  };

  nameOnChangeHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  weightOnChangeHandler = (event) => {
    this.setState({ weight: event.target.value });
  };

  render() {
    return (
      <div className={classes.PersonManager}>
        <input
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={this.nameOnChangeHandler}
        />
        <input
          type="text"
          placeholder="Weight"
          value={this.state.weight}
          onChange={this.weightOnChangeHandler}
        />
        <button
          onClick={() =>
            this.props.onAddPerson(this.state.name, this.state.weight)
          }
          className={classes.Button}
        >
          Add Person
        </button>
        <button
          onClick={() => this.props.onCalculateAvg(this.props.persons)}
          className={classes.Button}
        >
          Calculate Avg
        </button>
        <Persons
          persons={this.props.persons}
          averageWeight={this.props.averageWeight}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    persons: state.personState.persons,
    averageWeight: state.weightState.averageWeight,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPerson: (name, weight) =>
      dispatch({
        type: actionTypes.ADD_PERSON,
        payload: { name: name, weight: weight },
      }),
    onCalculateAvg: (persons) =>
      dispatch({
        type: actionTypes.CALCULATE_AVG,
        payload: { persons: persons },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonManager);
