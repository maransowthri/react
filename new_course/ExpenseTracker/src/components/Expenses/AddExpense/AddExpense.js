import { useState } from "react";
import "./AddExpense.css";
import ExpenseForm from "./ExpenseForm/ExpenseForm";

const AddExpense = ({ onAddExpense }) => {
  const [expenseFormState, setExpenseFormState] = useState(false);

  const showExpenseFormHandler = () => setExpenseFormState(true);
  const hideExpenseFormHandler = () => setExpenseFormState(false);

  const addNewExpenseEl = !expenseFormState && (
    <button onClick={showExpenseFormHandler}>Add New Expense</button>
  );
  const expenseFormEl = expenseFormState && (
    <ExpenseForm
      onAddExpense={onAddExpense}
      hideExpenseForm={hideExpenseFormHandler}
    />
  );

  return (
    <div className="new-expense">
      {addNewExpenseEl}
      {expenseFormEl}
    </div>
  );
};

export default AddExpense;
