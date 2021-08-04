import classes from "./OrderSummary.module.css";
import { INGREDINETS } from "../../../store/reducers/dosaBuilder";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((key) => (
    <li key={key}>
      {INGREDINETS[key].label} : {props.ingredients[key]}
    </li>
  ));
  return (
    <div className={classes.OrderSummary}>
      <h3>Order Summary</h3>
      <ul>{ingredients}</ul>
      <p>
        Total Price: $ <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      <div className={classes.Button}>
        <Button click={props.orderedHandler} type="Success">
          Continue
        </Button>
        <Button click={props.modalHandler} type="Danger">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
