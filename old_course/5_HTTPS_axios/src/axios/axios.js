import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

api.interceptors.request.use(
  (req) => {
    console.log(req);
    return req;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

api.defaults.headers["Authorization"] = "Token JSGDSD%&^%&^*&@(#*XHS";
api.defaults.headers.post["POST-Token"] = "POST Token DJSHGDYW^&^*@&#(*(D)";

export default api;
