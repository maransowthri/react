import React from "react";

const Counter = React.memo(({ counter }) => {
  console.log("RENDERING COUNTER");
  return <div>{counter}</div>;
});

export default Counter;
