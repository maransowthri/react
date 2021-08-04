import React, { useState } from "react";
import "./App.css";

const someComplexLogic = () => {
  console.log("Running");
  return 0;
};

function App() {
  const [counter, setCounter] = useState(someComplexLogic);

  const onAdd = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const onSub = () => {
    setCounter((prevCounter) => prevCounter - 1);
  };

  return (
    <div className="App">
      <h3>Counter</h3>
      <button onClick={onAdd}>+</button>
      <span>{counter}</span>
      <button onClick={onSub}>-</button>
    </div>
  );
}

export default App;
