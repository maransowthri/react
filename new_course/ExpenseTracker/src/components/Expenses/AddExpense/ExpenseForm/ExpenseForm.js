import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ onAddExpense, hideExpenseForm }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  //   const [data, setData] = useState({
  //     title: "",
  //     amount: "",
  //     date: "",
  //   });

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);

    // setData((prevState) => {
    //   return {
    //     ...prevState,
    //     title: event.target.value,
    //   };
    // });
  };

  const changeAmountHandler = (event) => {
    setAmount(event.target.value);
  };

  const changeDateHandler = (event) => {
    setDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredData = {
      id: Math.random(),
      title,
      amount: +amount,
      date: new Date(date),
    };
    onAddExpense(enteredData);
    setTitle("");
    setAmount("");
    setDate("");
    hideExpenseForm();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" onChange={changeTitleHandler} value={title} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            onChange={changeAmountHandler}
            value={amount}
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={changeDateHandler}
            min="2019-01-01"
            max="2022-12-31"
          />
        </div>
      </div>

      <div className="new-expense__actions">
        <button type="button" onClick={hideExpenseForm}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
