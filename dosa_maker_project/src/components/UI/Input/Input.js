import classes from "./Input.module.css";

const Input = (props) => {
  let inputEl = null;
  let errorMessage = null;

  if (props.touched && props.invalid) {
    errorMessage = <p>{props.errorMessage}</p>;
  }

  switch (props.type) {
    case "textarea":
      inputEl = (
        <textarea
          className={classes.Input}
          onChange={props.changeHandler}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      inputEl = (
        <select
          className={classes.Input}
          onChange={props.changeHandler}
          {...props.elementConfig}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={classes.Input}
          onChange={props.changeHandler}
          {...props.elementConfig}
        />
      );
  }

  return (
    <>
      {errorMessage}
      {inputEl}
    </>
  );
};

export default Input;
