import React from "react";

const UserInput = (props) => {
  const style = {
    padding: ".5rem",
    margin: "2rem 0",
  };
  return (
    <input
      style={style}
      type="text"
      value={props.name}
      onChange={props.update}
    />
  );
};

export default UserInput;
