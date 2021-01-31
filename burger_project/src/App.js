import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});
const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

function App({ onAutoSignIn }) {
  useEffect(() => {
    onAutoSignIn();
  }, [onAutoSignIn]);

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/login" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route render={() => <div>Page not found!</div>} />
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignIn: () => dispatch(actions.autoSignIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
