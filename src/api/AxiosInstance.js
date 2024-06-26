import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3002/api/v1",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;
