import axios from "axios";

const makeRequest = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://yummy-1c9f.onrender.com/api",

  withCredentials: true,
});

export default makeRequest;
