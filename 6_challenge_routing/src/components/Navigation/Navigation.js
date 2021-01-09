import classes from "./Navigation.module.css";

import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className={classes.Navigation}>
      <h3>Logo</h3>
      <ul>
        <li>
          <NavLink activeClassName={classes.Active} to="/courses">
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.Active} to="/users">
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
