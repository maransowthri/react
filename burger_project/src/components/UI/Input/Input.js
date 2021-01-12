import classes from "./Input.module.css";

const Input = (props) => {
  let inputEl = "";

  switch (props.elementType) {
    case "textarea":
      inputEl = <textarea onChange={props.changed} {...props.elementConfig} />;
      break;

    case "select":
      inputEl = (
        <select
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
      inputEl = <input onChange={props.changed} {...props.elementConfig} />;
      break;
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputEl}
    </div>
  );
};

export default Input;
