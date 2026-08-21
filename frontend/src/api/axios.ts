import axios from "axios";

// Saat development: Vite proxy meneruskan /api → http://localhost:8080
// Saat production: ganti dengan URL backend yang sebenarnya, misal: https://api.sekolah.sch.id
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: tambahkan token JWT ke setiap request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 (expired/invalid token)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_email");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
