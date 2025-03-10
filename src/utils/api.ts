import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor Modify headers, add auth tokens, etc.)
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: {response : {data : string}}) => Promise.reject(error instanceof Error ? error : new Error(error.response?.data || "Unknown error"))
);

// response interceptor (Global error handling)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error : {response : {data : string}}) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    }
    return Promise.reject(error instanceof Error ? error : new Error(error.response?.data || "Unknown error"));
  }
);

// Generic API Call Function
const apiRequest = async <T>(method: "GET" | "POST" | "PUT" | "DELETE", url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await api({ method, url, data, ...config });
    return response.data as T;
  } catch (error) {
    throw error;
  }
};

export default apiRequest;
