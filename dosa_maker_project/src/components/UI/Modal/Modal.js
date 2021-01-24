import React, { Component } from "react";

import classes from "./Modal.module.css";
import BackDrop from "../BackDrop/BackDrop";

class Modal extends Component {
  shouldComponentUpdate(nextState) {
    return (
      nextState.state !== this.props.state ||
      nextState.children !== this.props.children
    );
  }
  
  render() {
    return (
      <>
        <BackDrop
          click={this.props.click}
          state={this.props.state ? "true" : null}
        />
        <div
          className={[
            classes.Modal,
            this.props.state ? classes.Open : classes.Close,
          ].join(" ")}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
