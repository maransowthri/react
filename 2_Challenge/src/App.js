import React, { Component } from "react";
import Validation from "./Validations/Validation";
import Char from "./Char/Char";
import "./App.css";

class App extends Component {
  state = { text: "" };
  chars = null;

  deleteHandler = (letter) => {
    let text = this.state.text;
    this.setState({ text: text.replace(letter, "") });
  };

  changeHandler = (event) => {
    this.setState({ text: event.target.value });
  };

  render() {
    let letters = this.state.text.split("");

    this.chars = letters.map((char, index) => (
      <Char key={index} char={char} delete={() => this.deleteHandler(char)} />
    ));

    return (
      <div className="App">
        <input
          type="text"
          value={this.state.text}
          onChange={(event) => this.changeHandler(event)}
        />
        <p>Length: {this.state.text.length}</p>
        <Validation length={this.state.text.length} />
        {this.chars}
      </div>
    );
  }
}

export default App;
