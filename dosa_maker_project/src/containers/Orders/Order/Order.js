import classes from "./Order.module.css";

const Order = (props) => {
  let ingredients = Object.keys(props.ingredients).map(
    (key) => key + "(" + props.ingredients[key] + ")"
  );
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients.join(" ")}</p>
      <p>
        Price <strong>${props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
