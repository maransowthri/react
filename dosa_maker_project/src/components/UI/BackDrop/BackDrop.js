import classes from "./BackDrop.module.css";

const BackDrop = (props) => {
  return (
    <>
      {props.state ? (
        <div onClick={props.click} className={classes.BackDrop}></div>
      ) : null}
    </>
  );
};

export default BackDrop;
