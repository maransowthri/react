import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";

import "./Blog.css";
import asyncComponent from "../../hoc/asyncComponent";

import Posts from "../Posts/Posts";

// import NewPost from "../NewPost/NewPost";

const AsyncNewPost = asyncComponent(() => {
  return import("../NewPost/NewPost");
});

class Blog extends Component {
  state = {
    authenticated: true,
  };

  render() {
    return (
      <div>
        <header className="Nav">
          <nav>
            <h3>
              <NavLink to="/">Logo</NavLink>
            </h3>
            <ul>
              <li>
                <NavLink exact to="/posts">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    // hash: "home",
                    // search: "name=Maran",
                  }}
                  activeClassName="my-active"
                  activeStyle={{ color: "orange", textDecoration: "underline" }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/" render={() => <h1>Home (Not Exact)</h1>} /> */}
        <Switch>
          {this.state.authenticated ? (
            <Route path="/new-post" component={AsyncNewPost} />
          ) : null}
          {/* <Route path="/posts/:id" component={FullPost} /> */}
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>Page Not Found!</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
        {/* <Posts /> */}
      </div>
    );
  }
}

export default Blog;
