import React, { Component } from "react";
import PizzaImage from "../components/PizzaPage/PizzaPage";
import PizzaPage from "../components/PizzaPage/PizzaPage";

class Pizza extends Component {
  render() {
    return (
      <div>
        <h1>The Pizza</h1>
        <PizzaImage />
      </div>
    );
  }
}

export default Pizza;
