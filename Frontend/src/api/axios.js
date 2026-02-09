import axios from "axios";

const api = axios.create({
//   baseURL: "https://ai-tutor-jh8t.onrender.com/api",
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export default api;
