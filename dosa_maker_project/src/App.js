import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import DosaBuilder from "./containers/DosaBuilder/DosaBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/" component={DosaBuilder} />
      </Switch>
    </Layout>
  );
};

export default App;
