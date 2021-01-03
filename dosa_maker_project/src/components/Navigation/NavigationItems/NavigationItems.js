import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem active>
        <h3>Home</h3>
      </NavigationItem>
      <NavigationItem>
        <h3>Checkout</h3>
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
