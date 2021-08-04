import { Link, Route, Switch } from "react-router-dom";
import Users from "./containers/Users";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const AsyncPizza = asyncComponent(() => {
  return import("./containers/Pizza");
});

const App = (props) => {
  return (
    <div>
      <div>
        <Link to="/">Users</Link>
        <Link to="/pizza">Pizza</Link>
      </div>
      <div>
        <Switch>
          <Route path="/pizza" component={AsyncPizza} />
          <Route path="/" component={Users} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
