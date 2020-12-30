import React, { Component } from "react";
import Item from "./Item/Item_CSSModules";

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
        <Item data={data} />
        <button onClick={this.toggleHandler}>{buttonText}</button>
      </div>
    );
  }
}

export default App;
