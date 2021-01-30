import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${page}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, [page]);

  return (
    <div className="App">
      <button onClick={() => setPage("posts")}>Posts</button>
      <button onClick={() => setPage("comments")}>Comments</button>
      <button onClick={() => setPage("users")}>Users</button>
      <h3>{page}</h3>
      <p>{JSON.stringify(items)}</p>
    </div>
  );
}

export default App;
