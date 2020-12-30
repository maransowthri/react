import React from "react";
import { StyleRoot } from "radium";

export default function Item(props) {
  const style = {
    "@media (min-width: 501px) and (max-width: 600px)": {
      color: "blue",
    },
    "@media (max-width: 500px)": {
      color: "green",
    },
  };

  return (
    <StyleRoot>
      <div>
        <p style={style}>{props.data}</p>
      </div>
    </StyleRoot>
  );
}
