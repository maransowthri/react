import { Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import DosaBuilder from "./containers/DosaBuilder/DosaBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.onAutoSignIn();
  }
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/login" component={Auth} />
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
