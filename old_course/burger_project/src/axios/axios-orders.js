import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-project-33143-default-rtdb.firebaseio.com/",
});

export default instance;
