import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
// import axios from "axios";

import App from "./App";
import "./index.css";

// axios.interceptors.request.use(
//   (req) => {
//     console.log(req);
//     return req;
//   },
//   (err) => {
//     console.log(err);
//     return Promise.reject(err);
//   }
// );

// axios.interceptors.response.use(
//   (res) => {
//     console.log(res);
//     return res;
//   },
//   (err) => {
//     console.log("Custom Error", err);
//     return err;
//   }
// );

// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
// axios.defaults.headers["Authorization"] =
//   "AUTH TOKEN bdskjfhuy4928739d8@%#$@^%#";
// axios.defaults.headers.post["POST-Token"] = "POST TOKEN JDHSGJD&^*&^*&#DS*D&";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
