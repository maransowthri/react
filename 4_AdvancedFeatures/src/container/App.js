import React, { Component } from "react";

import Cockpit from "../components/Cockpit/Cockpit";
import Persons from "../components/Persons/Persons";
import withClass from "../HOC/withClass";
import AuthContext from "../context/auth-context";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    console.log("[App.js] constructor called!");
  }

  state = {
    persons: [
      { id: 1, name: "Karan", age: 27 },
      { id: 2, name: "Kalees", age: 24 },
    ],
    cockpitDisplay: true,
    dummyCounter: 0,
    loggedIn: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps called", props);
    return state;
  }

  componentDidMount() {
    console.log("[App.js] componentDidMount called");
  }

  deleteHandler = (id) => {
    const curPersonIndex = this.state.persons.findIndex(
      (person) => person.id === id
    );
    const persons = [...this.state.persons];
    persons.splice(curPersonIndex, 1);
    this.setState({ persons });
  };

  updateHandler = (event, id) => {
    const curPersonIndex = this.state.persons.findIndex(
      (person) => person.id === id
    );
    const persons = [...this.state.persons];
    const curPerson = persons[curPersonIndex];
    curPerson.name = event.target.value;
    this.setState({ persons });
  };

  createHandler = () => {
    const persons = [...this.state.persons];
    const nameInputEl = document.getElementById("name");
    const newPerson = {
      id: persons[persons.length - 1].id + 1,
      name: nameInputEl.value,
      age: 25,
    };
    persons.push(newPerson);
    this.setState((prevState, props) => ({
      persons,
      dummyCounter: prevState.dummyCounter + 1,
    }));
    nameInputEl.value = "";
  };

  loginHandler = () => this.setState({ loggedIn: true });

  render() {
    console.log("[App.js] render called");
    return (
      <>
        <button onClick={() => this.setState({ cockpitDisplay: false })}>
          Remove Cockpit
        </button>

        <AuthContext.Provider
          value={{ loggedIn: this.state.loggedIn, login: this.loginHandler }}
        >
          {this.state.cockpitDisplay ? (
            <Cockpit persons={this.state.persons} />
          ) : null}

          <Persons
            persons={this.state.persons}
            create={this.createHandler}
            update={this.updateHandler}
            delete={this.deleteHandler}
          />
        </AuthContext.Provider>
      </>
    );
  }
}

export default withClass(App, "App");
