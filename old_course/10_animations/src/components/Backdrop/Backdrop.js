import React from "react";

import "./Backdrop.css";

const backdrop = (props) => {
  const classes = [
    "Backdrop",
    props.show ? "BackdropOpened" : "BackdropClosed",
  ];
  return <div onClick={props.showHandler} className={classes.join(" ")}></div>;
};

export default backdrop;
