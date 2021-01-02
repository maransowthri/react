import React from "react";

import burgerLogo from "../../assets/img/logo.png";
import classes from "./Logo.module.css";

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="Burger Mania" />
    </div>
  );
};

export default Logo;
