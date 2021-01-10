import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem to="/">
        <h3>Home</h3>
      </NavigationItem>
      <NavigationItem to="/orders">
        <h3>Orders</h3>
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
