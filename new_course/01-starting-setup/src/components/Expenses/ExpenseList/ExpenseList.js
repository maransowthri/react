import Expense from "../Expense/Expense";
import "./ExpenseList.css";

const ExpenseList = ({ expenseList }) => {
  if (expenseList.length === 0) {
    return <h2 className="expenses-list__fallback">No Expenses Found!</h2>;
  }

  const expenseElList = expenseList.map(({ id, title, amount, date }) => (
    <Expense key={id} title={title} amount={amount} date={date} />
  ));

  return <ul className="expenses-list">{expenseElList}</ul>;
};

export default ExpenseList;
