import React, { useState, useReducer } from "react";
import "./App.css";
import Todo from "./Todo";

const ACTIONS = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  DELETE_TODO: "DELETE_TODO",
};

const reduder = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return todos.concat(newTodo(action.payload.title));
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return todos;
  }
};

const newTodo = (title) => {
  return { id: Date.now(), title, completed: false };
};

function App() {
  const [todos, dispatch] = useReducer(reduder, []);
  const [title, setTitle] = useState("");

  const onAdd = () => {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { title } });
    setTitle("");
  };

  const onDelete = (id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } });
  };

  const onComplete = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id } });
  };

  return (
    <div className="App">
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={onAdd}>submit</button>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          remove={() => onDelete(todo.id)}
          complete={() => onComplete(todo.id)}
          todo={todo}
        />
      ))}
    </div>
  );
}

export default App;
