import classes from "./SideDrawer.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/BackDrop/BackDrop";

const SideDrawer = (props) => {
  return (
    <>
      <BackDrop click={props.sideDrawerToggler} state={props.sideDrawerState} />
      <div
        className={[
          classes.SideDrawer,
          props.sideDrawerState ? classes.Open : classes.Close,
        ].join(" ")}
      >
        <NavigationItems />
      </div>
    </>
  );
};

export default SideDrawer;
