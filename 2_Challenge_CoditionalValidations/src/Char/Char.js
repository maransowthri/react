import React from "react";

export default function Char(props) {
  const style = {
    display: "inline-block",
    padding: "16px",
    textAlign: "center",
    margin: "16px",
    border: "1px solid black",
  };
  return (
    <div onClick={props.delete} style={style}>
      <p>{props.char}</p>
    </div>
  );
}
