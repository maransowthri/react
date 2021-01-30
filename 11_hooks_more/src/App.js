import React, { useMemo, useState } from "react";
import "./App.css";
import Counter from "./Counter";

function App() {
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState("");
  const val = useMemo(() => slowFunction(counter), [counter]);

  const onAdd = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <div className="App">
      <Counter counter={counter} />
      <button onClick={onAdd}>Count</button>
      {time.toString()}
      {val}
      <button onClick={() => setTime(new Date())}>Get Time</button>
    </div>
  );
}

const slowFunction = () => {
  console.log("Hi");
  for (let index = 0; index < 10000000; index++) {}
  return 2;
};

export default App;
