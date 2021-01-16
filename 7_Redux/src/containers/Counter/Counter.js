import React, { Component } from "react";
import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionCreators from "../../store/actions/index";

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
    onIncrement: () => dispatch(actionCreators.incCounter()),
    onDecrement: () => dispatch(actionCreators.decCounter()),
    onAdd: () => dispatch(actionCreators.addCounter(5)),
    onSub: () => dispatch(actionCreators.subCounter(5)),
    onStoreResult: (counter) => dispatch(actionCreators.storeResult(counter)),
    onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
