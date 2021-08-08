import { useState } from "react";
import Card from "../UI/Card/Card";
import ExpenseList from "./ExpenseList/ExpenseList";
import "./Expenses.css";
import ExpensesChart from "./ExpensesChart/ExpensesChart";
import ExpensesFilter from "./ExpensesFilter/ExpensesFilter";

const Expenses = ({ expenses }) => {
  const [selectedYear, setSelectedYear] = useState("ALL");

  const expenseList =
    selectedYear === "ALL"
      ? expenses
      : expenses.filter(
          (expense) => expense.date.getFullYear() === +selectedYear
        );

  const onFilterExpense = (year) => {
    setSelectedYear(year);
  };

  return (
    <div>
      <ExpensesFilter onFilterExpense={onFilterExpense} />
      <ExpensesChart expenses={expenseList} />
      <Card className="expenses">
        <ExpenseList expenseList={expenseList} />
      </Card>
    </div>
  );
};

export default Expenses;
