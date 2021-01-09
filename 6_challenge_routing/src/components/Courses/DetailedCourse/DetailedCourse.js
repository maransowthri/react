import React, { Component } from "react";

import classes from "./DetailedCourse.module.css";

class DetailedCourse extends Component {
  componentDidUpdate() {
    // console.log("DetailedCourse updated!");
  }

  componentDidMount() {
    // console.log("DetailedCourse mounted!");
  }

  render() {
    let params = new URLSearchParams(this.props.location.search);

    return (
      <div className={classes.DetailedCourse}>
        <h1>{params.get("title")}</h1>
        <p>This is for the developers community</p>
        <h3>{params.get("author")}</h3>
        <p>He has a Youtube channel with 1 million subscribers</p>
        <h3>{params.get("price")}</h3>
        <p>Offer expires soon.</p>
      </div>
    );
  }
}

export default DetailedCourse;
