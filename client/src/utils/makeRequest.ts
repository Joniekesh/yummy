import axios from "axios";
// import { AxiosInstance } from "axios";

const makeRequest = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default makeRequest;
