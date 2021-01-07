import React, { Component } from "react";
import api from "../../axios/axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidUpdate() {
    if (this.props.postId) {
      if (
        this.state.loadedPost &&
        this.props.postId === this.state.loadedPost.id
      ) {
        return;
      }
      api.get(`/posts/${this.props.postId}`).then((res) => {
        this.setState({ loadedPost: res.data });
      });
    }
  }

  deletePost = () => {
    api.delete(`/posts/${this.props.postId}`).then((res) => {
      console.log(res);
    });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

    if (this.props.postId) {
      post = <p style={{ textAlign: "center" }}>Loading...</p>;
    }

    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePost} className="Delete">
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
