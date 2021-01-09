import React, { Component } from "react";

import classes from "./Course.module.css";

class Course extends Component {
  componentDidUpdate() {
    // console.log("Component updated!");
  }
  render() {
    return (
      <li className={classes.Course}>
        <h3>{this.props.title}</h3>
        <p>
          Created by <span>{this.props.author}</span>
        </p>
        <h3>Price: ${this.props.price}</h3>
      </li>
    );
  }
}

export default Course;
