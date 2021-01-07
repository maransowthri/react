import axios from "axios";

const instance = axios.create({
  baseURL: "https://dosa-maker-project-default-rtdb.firebaseio.com/",
});

export default instance;
