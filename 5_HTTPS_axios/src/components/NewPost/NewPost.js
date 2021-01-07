import React, { Component } from "react";
import api from "../../axios/axios";

import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Maran",
  };

  createPost = () => {
    const data = {
      title: this.state.title,
      content: this.state.body,
      author: this.state.author,
    };
    api
      .post("https://jsonplaceholder.typicode.com/posts/", data)
      .then((res) => {
        console.log(res);
      });
  };

  render() {
    return (
      <div className="NewPost">
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={(event) => this.setState({ author: event.target.value })}
        >
          <option value="Max">Karan</option>
          <option value="Max">Kalees</option>
          <option value="Max">Maran</option>
          <option value="Manu">Mahesh</option>
        </select>
        <button onClick={this.createPost}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
