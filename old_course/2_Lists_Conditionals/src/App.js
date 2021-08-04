import React, { Component } from "react";
import UserOutput from "./UserOutput/UserOutput";
import UserInput from "./UserInput/UserInput";
import "./App.css";

export default class App extends Component {
  state = {
    users: [
      { id: 1, name: "Maran", age: 21 },
      { id: 2, name: "Adam", age: 32 },
    ],
    showUsers: false,
  };

  toggleUsersHandler = () => {
    this.setState({ showUsers: !this.state.showUsers });
  };

  deleteHandler = (id) => {
    const users = [...this.state.users];
    let index = users.map((user) => user.id).indexOf(id);
    users.splice(index, 1);
    this.setState({ users });
  };

  updateHandler = (event, id) => {
    const users = [...this.state.users];
    let curUserIndex = users.findIndex((user) => user.id);
    let curUser = users.find((user) => user.id);
    curUser.name = event.target.value;
    users.splice(curUserIndex, 1, curUser);
    this.setState({ users });
  };

  render() {
    let users = null;

    const buttonStyle = {
      padding: "1rem",
      margin: "1rem 0",
    };

    if (this.state.showUsers) {
      users = (
        <div>
          {this.state.users.map((user) => (
            <div key={user.id}>
              <UserInput
                update={(event) => this.updateHandler(event, user.id)}
                name={user.name}
              />
              <UserOutput
                delete={this.deleteHandler.bind(this, user.id)}
                name={user.name}
                age={user.age}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="App">
        {users}
        <button style={buttonStyle} onClick={this.toggleUsersHandler}>
          Toggle Users
        </button>
      </div>
    );
  }
}
