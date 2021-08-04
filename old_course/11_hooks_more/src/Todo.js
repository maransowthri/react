import React from "react";

const Todo = ({ todo, remove, complete }) => {
  return (
    <div>
      <p style={{ color: todo.completed ? "green" : "#333" }}>{todo.title}</p>
      <button onClick={remove}>Delete</button>
      <button onClick={complete}>Complete</button>
    </div>
  );
};

export default Todo;
