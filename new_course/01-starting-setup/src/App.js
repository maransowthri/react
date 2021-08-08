// import React from "react";
import { useState } from "react";
import AddExpense from "./components/Expenses/AddExpense/AddExpense";
import Expenses from "./components/Expenses/Expenses";

const EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {
  const [expenses, setExpenses] = useState(EXPENSES);

  const addExpense = (expenseData) => {
    setExpenses((prevState) => {
      return [...prevState, expenseData];
    });
  };

  /* What's happening behind the scenes */
  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h2", {}, "Let's get started!"),
  //   React.createElement(Expenses, { expenses: expenses })
  // );

  return (
    <div>
      <AddExpense onAddExpense={addExpense} />
      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
