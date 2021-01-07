import React, { Component } from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  // componentDidUpdate() {
  //   console.log("Modal updated!");
  // }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} close={this.props.close} />
        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
