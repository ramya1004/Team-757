import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE ===  "http://localhost:4000/api",
  withCredentials: true,
});