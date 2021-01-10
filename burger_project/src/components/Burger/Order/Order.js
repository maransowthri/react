import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = Object.keys(props.ingredients).map((key) => {
    return (
      <span
        style={{ border: "1px solid #333", margin: "5px", padding: ".3rem" }}
        key={key}
      >
        <span style={{ textTransform: "capitalize" }}>{key}</span>
        {"(" + props.ingredients[key] + ") "}
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>${props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
