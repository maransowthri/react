import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

function App() {
  // const [state, setState] = useState({ builderState: true });
  // setTimeout(() => {
  //   setState({ builderState: false });
  // }, 5000);
  return (
    <div>
      {/* <Layout>{state.builderState ? <BurgerBuilder /> : null}</Layout> */}
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route render={() => <div>Page not found!</div>} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
