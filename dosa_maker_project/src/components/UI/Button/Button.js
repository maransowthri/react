import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.click}
      disabled={props.disabled}
      className={[
        classes.Button,
        classes[props.type],
        props.disabled ? classes.Disabled : null,
      ].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
