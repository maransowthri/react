import React, { Component } from "react";
import { connect } from "react-redux";

import Persons from "../../components/Persons/Persons";
import classes from "./PersonManager.module.css";
import * as actionTypes from "../../store/actions";

class PersonManager extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onAddPerson} className={classes.Button}>
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
    onAddPerson: () => dispatch({ type: actionTypes.ADD_PERSON }),
    onCalculateAvg: (persons) =>
      dispatch({
        type: actionTypes.CALCULATE_AVG,
        payload: { persons: persons },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonManager);
