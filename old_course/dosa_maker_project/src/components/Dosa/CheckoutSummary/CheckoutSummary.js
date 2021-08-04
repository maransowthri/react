import DosaIngredients from "../DosaIngredients/DosaIngredients";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <>
      <h1>Checkout Page</h1>
      {props.ingredients ? (
        <DosaIngredients ingredients={props.ingredients} />
      ) : null}
      <div className={classes.BtnGroup}>
        <Button type="Primary" click={props.placeOrder}>
          Continue
        </Button>
        <Button type="Secondary" click={props.cancelOrder}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default CheckoutSummary;
