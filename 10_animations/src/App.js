import React, { Component } from "react";
import { Transition } from "react-transition-group";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    show: false,
    displayBlock: false,
  };

  showHandler = () => {
    this.setState((prevState) => {
      return { show: !prevState.show };
    });
  };

  displayBlock = () => {
    this.setState((prevState) => {
      return { displayBlock: !prevState.displayBlock };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button
          style={{ margin: "1rem 0" }}
          onClick={this.displayBlock}
          className="Button"
        >
          Toggle
        </button>
        <br />
        <Transition
          in={this.state.displayBlock}
          timeout={1000}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <div
              style={{
                ...blockStyle,
                opacity: state === "entering" ? "1" : "0",
                transition: "opacity 1s ease-in",
              }}
            >
              {state}
            </div>
          )}
        </Transition>
        <Modal show={this.state.show} showHandler={this.showHandler} />
        {this.state.show ? (
          <Backdrop show={this.state.show} showHandler={this.showHandler} />
        ) : null}
        <button onClick={this.showHandler} className="Button">
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

const blockStyle = {
  background: "red",
  height: "100",
  width: "100",
  margin: "auto",
  marginTop: "1rem",
  marginBottom: "1rem",
  color: "white",
};

export default App;
