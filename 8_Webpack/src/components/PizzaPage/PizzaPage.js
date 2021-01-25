import classes from "./PizzaPage.module.css";
import PizzaImage from "../../assets/pizza.jpg";

const PizzaPage = (props) => {
  return (
    <div className={classes.PizzaPage}>
      <img src={PizzaImage} className={classes.PizzaImage} />
    </div>
  );
};

export default PizzaImage;
