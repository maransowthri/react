import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

// const app = function () {
//   const [personsState, setPersonsState] = useState({
//     persons: [
//       { name: "Karan", age: 27 },
//       { name: "Kalees", age: 24 },
//       { name: "Mahesh", age: 21 },
//     ],
//   });

//   const [groupState, setGroupState] = useState({
//     group: "A",
//   });

//   console.log(personsState, groupState);

//   const switchNameHandler = () => {
//     setPersonsState({
//       persons: [
//         { name: "Maran", age: 27 },
//         { name: "Kalees", age: 24 },
//         { name: "Mahesh", age: 21 },
//       ],
//     });
//   };

//   return (
//     <div className="App">
//       <h1>Hi, I'm Maran.</h1>
//       <Person
//         name={personsState.persons[0].name}
//         age={personsState.persons[0].age}
//       >
//         <button onClick={switchNameHandler}>Change Name</button>
//       </Person>
//       <Person
//         name={personsState.persons[1].name}
//         age={personsState.persons[1].age}
//       />
//       <Person
//         name={personsState.persons[2].name}
//         age={personsState.persons[2].age}
//       />
//     </div>
//   );
// };

// export default app;

class App extends Component {
  state = {
    persons: [
      { name: "Karan", age: 27 },
      { name: "Kalees", age: 24 },
    ],
  };

  switchNameHandler = (newName) => {
    this.setState({ persons: [{ name: newName, age: 27 }] });
  };

  changeNameHandler = (event) => {
    this.setState({ persons: [{ name: event.target.value, age: 27 }] });
  };

  render() {
    const style = { background: "coral" };
    return (
      <div>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={this.switchNameHandler.bind(this, "Karan")}
          change={this.changeNameHandler}
        >
          <button
            style={style}
            onClick={this.switchNameHandler.bind(this, "Kalees")}
          >
            Change Name
          </button>
        </Person>
      </div>
    );
  }
}

export default App;
