import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.194:5000/api"
});

export default API;

export const getProducts = () => API.get("/products");