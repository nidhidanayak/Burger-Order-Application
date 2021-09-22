import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-app-5e223.firebaseio.com/",
});

export default instance;
