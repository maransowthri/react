import React from "react";
import Async from "./Async";
import Sync from "./Sync";
import TodoList from "./TodoList";

const App = () => {
  return (
    <>
      <TodoList />
      <Sync />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Async />
      </React.Suspense>
    </>
  );
};

export default App;
