import DosaControl from "./DosaControl/DosaControl";
import classes from "./DosaControls.module.css";
import { INGREDINETS } from "../../../store/reducer";
import Button from "../../UI/Button/Button";

const DosaControls = (props) => {
  const controls = Object.keys(INGREDINETS).map((key) => (
    <DosaControl
      key={key}
      addIngredient={() => props.addIngredient(key)}
      removeIngredient={() => props.removeIngredient(key)}
      label={INGREDINETS[key].label}
    />
  ));

  return (
    <div className={classes.DosaControls}>
      <p>
        Total Price: <strong>$ {props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls}
      <div className={classes.Button}>
        <Button click={props.modalHandler} type="Success">
          ORDER NOW!
        </Button>
      </div>
    </div>
  );
};

export default DosaControls;
