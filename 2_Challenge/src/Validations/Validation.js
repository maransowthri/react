import React from "react";

export default function Validation(props) {
  let message = "";
  message =
    props.length < 5
      ? "Too Short"
      : props.length > 10
      ? "Too Big"
      : "Accepted!";
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
