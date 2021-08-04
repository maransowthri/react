import React from "react";
import "./UserData.css";

const UserInput = (props) => {
  const style = {
    borderColor: "green",
  };

  return (
    <div className="UserInput">
      <label for="username">Username</label>
      <input
        style={style}
        id="username"
        value={props.name}
        onChange={props.change}
        type="text"
      />
    </div>
  );
};

export default UserInput;
