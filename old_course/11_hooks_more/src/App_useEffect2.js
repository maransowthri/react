import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

  return <div className="App">{width}</div>;
}

export default App;
