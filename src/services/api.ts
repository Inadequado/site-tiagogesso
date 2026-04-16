import axios from "axios";

const api = axios.create({
  baseURL: "https://api-tiagogesso-production.up.railway.app",
});

export default api;
