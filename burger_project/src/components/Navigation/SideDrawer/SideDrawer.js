import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  const attachedClasses = [
    classes.SideDrawer,
    props.show ? classes.Open : classes.Close,
  ];
  return (
    <>
      <Backdrop show={props.show} close={props.click} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
