import React, { Component } from "react";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = { sideDrawerState: false };

  sideDrawerToggler = () => {
    this.setState((prevState) => {
      return { sideDrawerState: !prevState.sideDrawerState };
    });
  };

  render() {
    return (
      <>
        <Toolbar sideDrawerToggler={this.sideDrawerToggler} />
        <SideDrawer
          sideDrawerToggler={this.sideDrawerToggler}
          sideDrawerState={this.state.sideDrawerState}
        />
        <div>{this.props.children}</div>
      </>
    );
  }
}

export default Layout;
