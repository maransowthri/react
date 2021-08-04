import React from "react";

const UserOutput = (props) => {
  const style = {
    display: "inline",
    padding: "1rem",
  };
  return (
    <div>
      <p style={style}>
        {props.name} is {props.age} years old.
      </p>
      <button onClick={props.delete}>X</button>
    </div>
  );
};

export default UserOutput;
