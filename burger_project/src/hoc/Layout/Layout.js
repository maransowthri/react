import React, { Component } from "react";
import { connect } from "react-redux";

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
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          openSideDrawer={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          show={this.state.sideDrawerOpened}
          click={this.sideDrawerToggleHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
