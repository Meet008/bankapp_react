import axios from "axios";

// Better way to handle environment variables
const BASE_URL =
  process.env.REACT_APP_API_BASE?.trim() !== ""
    ? process.env.REACT_APP_API_BASE
    : "/";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration or 401 errors globally
    if (error.response?.status === 401) {
      console.warn("Unauthorized: Token expired or invalid");

      // OPTIONAL: Auto logout
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
