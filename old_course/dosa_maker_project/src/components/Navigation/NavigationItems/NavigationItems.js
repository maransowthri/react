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
      {props.isAuthenticated ? (
        <NavigationItem to="/logout">
          <h3>Logout</h3>
        </NavigationItem>
      ) : (
        <NavigationItem to="/login">
          <h3>Login</h3>
        </NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
