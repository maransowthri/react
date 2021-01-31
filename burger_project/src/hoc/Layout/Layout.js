import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

function Layout(props) {
  const [sideDrawerState, setSideDrawerState] = useState(false);

  const sideDrawerToggleHandler = () => {
    setSideDrawerState(!sideDrawerState);
  };

  return (
    <>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        openSideDrawer={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        show={sideDrawerState}
        click={sideDrawerToggleHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
