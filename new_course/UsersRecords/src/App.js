import React, { useState } from "react";
import UserInput from "./components/Users/UserInput/UserInput";
import UserList from "./components//Users/UserList/UserList";

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (name, age) => {
    const newUser = {
      id: Math.random(),
      name,
      age,
    };

    setUsers((prevUsers) => {
      return [...prevUsers, newUser];
    });
  };

  return (
    <div>
      <UserInput onAddUser={addUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;
