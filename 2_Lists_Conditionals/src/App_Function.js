import "./App.css";
import { useState } from "react";

import UserOutput from "./UserOutput/UserOutput";

function App() {
  const [stateUsers, setStateUsers] = useState({
    users: [{ name: "Maran" }, { name: "Adam" }],
    showUsers: false,
  });

  const toggleUserInfoHandler = () => {
    setStateUsers(
      stateUsers.showUsers
        ? { ...stateUsers, showUsers: false }
        : { ...stateUsers, showUsers: true }
    );
  };

  return (
    <div className="App">
      {stateUsers.showUsers ? (
        <div>
          <UserOutput name={stateUsers.users[0].name} />
          <UserOutput name={stateUsers.users[1].name} />
        </div>
      ) : null}
      <button onClick={toggleUserInfoHandler}>Toggle Users</button>
    </div>
  );
}

export default App;
