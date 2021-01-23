import React, { Component } from "react";
import { connect } from "react-redux";

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
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          sideDrawerToggler={this.sideDrawerToggler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          sideDrawerToggler={this.sideDrawerToggler}
          sideDrawerState={this.state.sideDrawerState}
        />
        <div>{this.props.children}</div>
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
