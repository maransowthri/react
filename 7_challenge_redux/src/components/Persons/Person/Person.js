import classes from "./Person.module.css";

const Person = (props) => {
  return (
    <div className={classes.Person}>
      <h4>{props.name}</h4>
      <p>Weight: {props.weight}</p>
      <button onClick={props.removePerson}>Delete</button>
    </div>
  );
};

export default Person;
