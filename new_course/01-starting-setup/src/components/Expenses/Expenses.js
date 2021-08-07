import Card from "../UI/Card/Card";
import Expense from "./Expense/Expense";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter/ExpensesFilter";

const ExpenseList = ({ expenses, onFilterExpense }) => {
  const expenseElList = expenses.map(({ id, title, amount, date }) => (
    <Expense key={id} title={title} amount={amount} date={date} />
  ));

  return (
    <div>
      <ExpensesFilter onFilterExpense={onFilterExpense} />
      <Card className="expenses">{expenseElList}</Card>
    </div>
  );
};

export default ExpenseList;
