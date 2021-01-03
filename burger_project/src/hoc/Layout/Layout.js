import React, { Component } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    sideDrawerOpened: false,
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpened: !prevState.sideDrawerOpened };
    });
  };

  render() {
    return (
      <>
        <Toolbar openSideDrawer={this.sideDrawerToggleHandler} />
        <SideDrawer
          show={this.state.sideDrawerOpened}
          click={this.sideDrawerToggleHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
