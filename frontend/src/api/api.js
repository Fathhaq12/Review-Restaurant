import axios from "axios";
import { BASE_URL } from "../utils";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getData = (path) => {
  return API.get(path);
};

export default API;
