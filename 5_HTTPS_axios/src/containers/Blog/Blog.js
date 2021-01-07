import React, { Component } from "react";
import api from "../../axios/axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false,
  };

  componentDidMount() {
    api
      .get("/posts")
      .then((res) => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return { ...post, author: "Maran" };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  selectPostHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = null;
    if (this.state.error) {
      posts = <p style={{ textAlign: "center" }}>Something went wrong</p>;
    } else {
      posts = this.state.posts.map((post) => (
        <Post
          key={post.id}
          click={() => this.selectPostHandler(post.id)}
          title={post.title}
          author={post.author}
        />
      ));
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost postId={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
