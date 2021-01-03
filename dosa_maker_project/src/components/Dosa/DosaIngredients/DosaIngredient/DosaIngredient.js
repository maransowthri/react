import classes from "./DosaIngredient.module.css";

const DosaIngredient = (props) => {
  switch (props.type) {
    case "dosa-top":
      return <div className={classes.DosaTop}></div>;
    case "dosa-bottom":
      return <div className={classes.DosaBottom}></div>;
    case "mushroom":
      return <div className={classes.Mushroom}></div>;
    case "cheese":
      return <div className={classes.Cheese}></div>;
    default:
      return null;
  }
};

export default DosaIngredient;
