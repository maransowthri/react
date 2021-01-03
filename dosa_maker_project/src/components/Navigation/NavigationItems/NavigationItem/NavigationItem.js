import classes from "./NavigationItem.module.css";

const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <a className={props.active ? classes.Active : null} href="/">
        {props.children}
      </a>
    </li>
  );
};

export default NavigationItem;
