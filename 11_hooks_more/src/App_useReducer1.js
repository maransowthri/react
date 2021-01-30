import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const prevName = useRef();

  useEffect(() => {
    prevName.current = name;
    console.log(prevName.current);
  }, [name]);

  return (
    <div className="App">
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <p>Entered Name: {name}</p>
      <p>Previous Name: {prevName.current} </p>
    </div>
  );
}

export default App;
