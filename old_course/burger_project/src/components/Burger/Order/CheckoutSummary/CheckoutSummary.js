import classes from "./CheckoutSummary.module.css";
import Button from "../../../UI/Button/Button";
import Burger from "../../../Burger/Burger";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h3>Your delicious food is ready!</h3>
      <Burger ingredients={props.ingredients} />
      <Button click={props.checkoutContinueHandler} btnType="Success">
        CONTINUE
      </Button>
      <Button click={props.checkoutCancelHandler} btnType="Danger">
        CANCEL
      </Button>
    </div>
  );
};

export default CheckoutSummary;
