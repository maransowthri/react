import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
    postID: null,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id !== this.state.postID) {
      axios.get("/posts/" + this.props.match.params.id).then((response) => {
        this.setState({
          loadedPost: response.data,
          postID: this.props.match.params.id,
        });
      });
    }
  }

  deletePostHandler = () => {
    axios.delete("/posts/" + this.props.match.params.id).then((response) => {
      console.log(response);
    });
  };

  render() {
    let post = "";
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
