import classes from "./DrawerToggle.module.css";

const DrawerToggle = (props) => {
  return (
    <div className={classes.DrawerToggle}>
      <h3 onClick={props.sideDrawerToggler}>MENU</h3>
    </div>
  );
};

export default DrawerToggle;
