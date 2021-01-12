import classes from "./Input.module.css";

const Input = (props) => {
  let inputEl = "";
  let errorMessage = null;
  let customClass = "";

  if (!props.valid && props.touched) {
    customClass = classes.Invalid;
    errorMessage = <p className={classes.ErrorMessage}>{props.errorMessage}</p>;
  }

  switch (props.elementType) {
    case "textarea":
      inputEl = (
        <textarea
          className={customClass}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
      break;

    case "select":
      inputEl = (
        <select
          className={customClass}
          onChange={props.changed}
          label={props.label}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => (
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
          className={customClass}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
      break;
  }

  return (
    <>
      <div className={classes.Input}>
        <label>{props.label}</label>
        {inputEl}
      </div>
      {errorMessage}
    </>
  );
};

export default Input;
