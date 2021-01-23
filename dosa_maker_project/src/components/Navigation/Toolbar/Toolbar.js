import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <DrawerToggle sideDrawerToggler={props.sideDrawerToggler} />
      <Logo />
      <div className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </div>
    </div>
  );
};

export default Toolbar;
