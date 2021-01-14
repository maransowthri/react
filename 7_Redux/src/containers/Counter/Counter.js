import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionTypes from "../../store/actions";

class Counter extends Component {
  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl label="Increment" clicked={this.props.onIncrement} />
        <CounterControl label="Decrement" clicked={this.props.onDecrement} />
        <CounterControl label="Add 5" clicked={this.props.onAdd} />
        <CounterControl label="Subtract 5" clicked={this.props.onSub} />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          Store Result
        </button>
        <ul>
          {this.props.results.map((item) => (
            <li key={item.id}>
              {item.value}{" "}
              <span onClick={() => this.props.onDeleteResult(item.id)}>X</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ctr: state.ctr.counter, results: state.res.results };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({ type: actionTypes.INC_COUNTER }),
    onDecrement: () => dispatch({ type: actionTypes.DEC_COUNTER }),
    onAdd: () =>
      dispatch({ type: actionTypes.ADD_COUNTER, payload: { value: 5 } }),
    onSub: () =>
      dispatch({ type: actionTypes.SUB_COUNTER, payload: { value: 5 } }),
    onStoreResult: (counter) =>
      dispatch({
        type: actionTypes.STORE_RESULT,
        payload: { counter: counter },
      }),
    onDeleteResult: (id) =>
      dispatch({ type: actionTypes.DELETE_RESULT, payload: { id: id } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
