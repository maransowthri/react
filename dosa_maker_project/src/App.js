import { Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import DosaBuilder from "./containers/DosaBuilder/DosaBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

class App extends Component {
  constructor(props) {
    super(props);
    this.props.onAutoSignIn();
  }
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/login" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={DosaBuilder} />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignIn: () => dispatch(actions.autoSignIn()),
  };
};

export default connect(null, mapDispatchToProps)(App);
