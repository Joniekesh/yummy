import axios from "axios";

const makeRequest = axios.create({
  baseURL: import.meta.env.BASE_URL,

  withCredentials: true,
});

export default makeRequest;
