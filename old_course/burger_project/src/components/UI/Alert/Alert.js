import classes from "./Alert.module.css";

const Alert = (props) => {
  return <div className={classes.Alert}>{props.message}</div>;
};

export default Alert;
