import React, { PureComponent } from "react";

import classes from "./Persons.module.css";

import Person from "./Person/Person";

export default class Persons extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(
  //     "[Persons.js] getDerivedStateFromProps Next Props",
  //     nextProps,
  //     " Next State ",
  //     nextState
  //   );
  //   return nextProps.persons !== this.props.persons;
  // }

  render() {
    let persons = this.props.persons.map((person) => (
      <Person
        key={person.id}
        name={person.name}
        age={person.age}
        delete={() => this.props.delete(person.id)}
        update={(event) => this.props.update(event, person.id)}
      />
    ));

    console.log("[Persons.js] render called");

    return (
      <div className={classes.Persons}>
        <h3>Users List</h3>
        <input className={classes.input} type="text" id="name" />
        <button className={classes.button} onClick={this.props.create}>
          Submit
        </button>
        {persons}
      </div>
    );
  }
}
