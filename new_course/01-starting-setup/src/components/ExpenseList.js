import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses }) {
  const expenseElList = expenses.map(({ id, title, amount, date }) => (
    <ExpenseItem key={id} title={title} amount={amount} date={date} />
  ));

  return expenseElList;
}

export default ExpenseList;
