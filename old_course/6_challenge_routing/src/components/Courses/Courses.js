import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import classes from "./Courses.module.css";

import Course from "./Course/Course";
import DetailedCourse from "./DetailedCourse/DetailedCourse";

class Courses extends Component {
  state = {
    courses: [
      { id: 0, title: "Modern JavaScript", author: "Brad Traversy", price: 5 },
      { id: 1, title: "Complete React", author: "Max Academind", price: 10 },
      { id: 2, title: "Django Course", author: "Brad Traversy", price: 5 },
    ],
  };

  render() {
    const courses = this.state.courses.map((course) => (
      <Link
        key={course.id}
        to={{
          pathname: this.props.match.url + "/" + course.id,
          search:
            "title=" +
            course.title +
            "&author=" +
            course.author +
            "&price=" +
            course.price,
        }}
      >
        <Course
          title={course.title}
          author={course.author}
          price={course.price}
        />
      </Link>
    ));
    return (
      <div className={classes.Courses}>
        <h1>Courses List</h1>
        <ul>{courses}</ul>
        <Route
          path={this.props.match.url + "/:id"}
          component={DetailedCourse}
        />
      </div>
    );
  }
}

export default Courses;
