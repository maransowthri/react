import classes from "./OrderSummary.module.css";
import { INGREDINETS } from "../../../../containers/DosaBuilder/DosaBuilder";
import Button from "../../../../components/UI/Button/Button";

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
        Total Price: $ <strong>{props.totalPrice}</strong>
      </p>
      <div className={classes.Button}>
        <Button
          click={() => {
            alert("Order Placed!");
          }}
          type="Success"
        >
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
