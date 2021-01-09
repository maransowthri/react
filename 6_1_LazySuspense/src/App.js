import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

// import Posts from './containers/Posts';
import User from "./containers/User";
import Welcome from "./containers/Welcome";

const Posts = React.lazy(() => import("./containers/Posts"));

class App extends Component {
  state = {
    showPosts: false,
  };

  postsHandler = () => {
    this.setState((prevState) => {
      return { showPosts: !prevState.showPosts };
    });
  };

  render() {
    return (
      <>
        <button onClick={this.postsHandler}>Toggler</button>
        {this.state.showPosts ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Posts />
          </Suspense>
        ) : null}
      </>
      // <BrowserRouter>
      //   <React.Fragment>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />
      //     <Route
      //       path="/posts"
      //       render={() => (
      //         <Suspense fallback={<div>Loading...</div>}>
      //           <Posts />
      //         </Suspense>
      //       )}
      //     />
      //   </React.Fragment>
      // </BrowserRouter>
    );
  }
}

export default App;
