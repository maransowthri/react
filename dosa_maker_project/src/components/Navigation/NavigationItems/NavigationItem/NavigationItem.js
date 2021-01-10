import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={props.to}>{props.children}</NavLink>
    </li>
  );
};

export default NavigationItem;
