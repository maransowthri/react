import DosaIngredient from "./DosaIngredient/DosaIngredient";
import classes from "./DosaIngredients.module.css";

const DosaIngredients = (props) => {
  let ingredients = null;
  if (props.ingredients) {
    ingredients = Object.keys(props.ingredients)
      .map((key) =>
        [...Array(props.ingredients[key])].map((_, i) => (
          <DosaIngredient type={key} key={key + i} />
        ))
      )
      .reduce((prev, current) => prev.concat(current), []);

    if (ingredients.length === 0) {
      ingredients = <p style={{ textAlign: "center" }}>Plain Dosa</p>;
    }
  }

  return (
    <div className={classes.DosaIngredients}>
      <DosaIngredient type="dosa-top" />
      {ingredients}
      <DosaIngredient type="dosa-bottom" />
    </div>
  );
};

export default DosaIngredients;
