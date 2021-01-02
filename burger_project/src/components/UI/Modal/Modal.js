import React from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <>
      <Backdrop show={props.show} close={props.close} />
      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        }}
        className={classes.Modal}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
