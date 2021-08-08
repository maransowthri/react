import { useState } from "react";
import Card from "../UI/Card/Card";
import Expense from "./Expense/Expense";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter/ExpensesFilter";

const Expenses = ({ expenses }) => {
  const [selectedYear, setSelectedYear] = useState("ALL");

  const expenseList =
    selectedYear === "ALL"
      ? expenses
      : expenses.filter(
          (expense) => expense.date.getFullYear() === +selectedYear
        );

  const expenseElList = expenseList.map(({ id, title, amount, date }) => (
    <Expense key={id} title={title} amount={amount} date={date} />
  ));

  const onFilterExpense = (year) => {
    setSelectedYear(year);
  };

  return (
    <div>
      <ExpensesFilter onFilterExpense={onFilterExpense} />
      <Card className="expenses">{expenseElList}</Card>
    </div>
  );
};

export default Expenses;
