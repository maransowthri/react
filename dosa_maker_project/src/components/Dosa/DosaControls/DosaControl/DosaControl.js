import classes from "./DosaControl.module.css";
import Button from "../../../UI/Button/Button";

const DosaControl = (props) => {
  return (
    <div className={classes.DosaControl}>
      <h3>{props.label}</h3>
      <Button
        click={props.removeIngredient}
        disabled={props.disabled ? true : null}
        type="Primary"
      >
        Less
      </Button>
      <Button click={props.addIngredient} type="Secondary">
        More
      </Button>
    </div>
  );
};

export default DosaControl;
