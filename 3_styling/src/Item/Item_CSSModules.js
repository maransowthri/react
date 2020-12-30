import React from "react";
import classes from "./Item.module.css";

export default function Item(props) {
  const assignedClasses = [classes.textArea];

  if (props.data) {
    assignedClasses.push(classes.hasData);
  } else {
    assignedClasses.push(classes.hasNoData);
  }

  return (
    <div>
      <p className={assignedClasses.join(" ")}>Data: {props.data}</p>
    </div>
  );
}
