import React, { Component } from "react";
import Item from "./Item/Item_CSSModules";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

class App extends Component {
  state = { flag: true };

  toggleHandler = () => {
    this.setState({ flag: !this.state.flag });
  };

  render() {
    const buttonText = this.state.flag ? "Hide" : "Show";

    const data = this.state.flag ? "This is the user data" : null;

    return (
      <div className="App">
        <ErrorBoundary>
          <Item data={data} />
        </ErrorBoundary>
        <button onClick={this.toggleHandler}>{buttonText}</button>
      </div>
    );
  }
}

export default App;
