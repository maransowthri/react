import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout/Layout";
import Courses from "./components/Courses/Courses";
import Users from "./components/Users/Users";

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/courses" component={Courses} />
            <Route path="/users" component={Users} />
            <Redirect from="/all-courses" to="/courses" />
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
