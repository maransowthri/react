import React, { useCallback, useState } from "react";
import "./App.css";
import Counter from "./Counter";

function App() {
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState("");

  const onAdd = useCallback(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <div className="App">
      <Counter counter={counter} />
      <button onClick={onAdd}>+</button>
      {time.toString()}
      <button onClick={() => setTime(new Date())}>Get Time</button>
    </div>
  );
}

export default App;
