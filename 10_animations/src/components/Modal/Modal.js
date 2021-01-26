import React from "react";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const animationTimings = {
  enter: 1000,
  exit: 300,
};

const modal = (props) => {
  return (
    <CSSTransition
      in={props.show}
      timeout={animationTimings}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: "",
        enterActive: "ModalOpen",
        exit: "",
        exitActive: "ModalClosed",
      }}
      //   onEnter={() => console.log("Enter")}
      //   onEntering={() => console.log("Entering")}
      //   onEntered={() => console.log("Entered")}
      //   onExit={() => console.log("Exit")}
      //   onExiting={() => console.log("Exiting")}
      //   onExited={() => console.log("Exited")}
    >
      <div className="Modal">
        <h1>A Modal</h1>
        <button onClick={props.showHandler} className="Button">
          Dismiss
        </button>
      </div>
    </CSSTransition>
  );
};

export default modal;
