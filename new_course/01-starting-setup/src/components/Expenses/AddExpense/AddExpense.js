import "./AddExpense.css";
import ExpenseForm from "./ExpenseForm/ExpenseForm";

const AddExpense = ({ onAddExpense }) => {
  return (
    <div className="new-expense">
      <ExpenseForm onAddExpense={onAddExpense} />
    </div>
  );
};

export default AddExpense;
