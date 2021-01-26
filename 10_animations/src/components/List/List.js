import React, { Component } from "react";
import TransistionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

import "./List.css";

class List extends Component {
  state = {
    items: [1, 2, 3],
  };

  addItemHandler = () => {
    this.setState((prevState) => {
      return {
        items: prevState.items.concat(prevState.items.length + 1),
      };
    });
  };

  removeItemHandler = (selIndex) => {
    this.setState((prevState) => {
      return {
        items: prevState.items.filter((item, index) => index !== selIndex),
      };
    });
  };

  render() {
    const listItems = this.state.items.map((item, index) => (
      <CSSTransition
        key={index}
        classNames={{
          enter: "ItemEnter",
          enterActive: "ItemEnterActive",
          exit: "ItemExit",
          exitActive: "ItemExitActive",
        }}
        timeout={300}
      >
        <li className="ListItem" onClick={() => this.removeItemHandler(index)}>
          {item}
        </li>
      </CSSTransition>
    ));

    return (
      <div>
        <button className="Button" onClick={this.addItemHandler}>
          Add Item
        </button>
        <p>Click Item to Remove.</p>
        <TransistionGroup component="ul" className="List">
          {listItems}
        </TransistionGroup>
      </div>
    );
  }
}

export default List;
