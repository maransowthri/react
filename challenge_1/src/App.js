import UserInput from "./UserData/UserInput";
import "./App.css";
import UserOutput from "./UserData/UserOutput";
import { useState } from "react";

function App() {
  const [stateUsers, setStateUsers] = useState({
    users: [{ name: "Maran" }, { name: "Adam" }],
  });

  const changeUsernameHandler = (e) => {
    setStateUsers({
      users: [{ name: "Maran" }, { name: e.target.value }],
    });
  };

  return (
    <div className="App">
      <UserInput
        name={stateUsers.users[1].name}
        change={changeUsernameHandler}
      />
      <UserOutput name={stateUsers.users[0].name} />
      <UserOutput name={stateUsers.users[1].name} />
    </div>
  );
}

export default App;
