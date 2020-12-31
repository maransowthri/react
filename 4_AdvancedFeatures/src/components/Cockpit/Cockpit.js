import React, { useEffect, useContext } from "react";
import classes from "./Cockpit.module.css";
import WithClass from "../../HOC/WithClass_1";
import AuthContext from "../../context/auth-context";

const Cockpit = (props) => {
  useEffect(() => {
    console.log("[Cockpit.js] useEffect");

    // setTimeout(() => {
    //   alert("Data Retrieved!");
    // }, 1000);

    return () => {
      console.log("[Cockpit.js] clean up triggered");
    };
  }, []);

  const context = useContext(AuthContext);

  console.log("[Cockpit.js] render called");

  return (
    <WithClass classes={classes.Cockpit}>
      <h1>Welcome to my App! ({props.persons.length})</h1>
      {<button onClick={context.login}>Login</button>}
    </WithClass>
  );
};

export default Cockpit;
