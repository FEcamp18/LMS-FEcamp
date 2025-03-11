import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor: Attach auth token if available
api.interceptors.request.use(
  (config) => {
    // auth-todo : Replace with real token retrieval logic
    const token = "pKUlhwawCsHqy2kcUHyIrTUv"; // Change this to actual token retrieval
    console.log("Token:", token);

    if (!token) {
      console.warn("Unauthorized: No token found.");
      return Promise.reject(new Error("Unauthorized"));
    }

    config.headers.Authorization = `Bearer ${token? token : ""}`;
    return config;
  },
  (error : {response:{data:string}}) => {
    return Promise.reject(
      error instanceof Error ? error : new Error(error.response?.data || "Unknown request error")
    );
  }
);

// response interceptor: Global error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error : {response:{data:string}}) => {
    console.error("API Error:", error.response?.data || "Unknown response error");
    return Promise.reject(
      error instanceof Error ? error : new Error(error.response?.data || "Unknown response error")
    );
  }
);

// Generic API Call Function
const apiRequest = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api({ method, url, data, ...config });
    return response.data as T;
  } catch (error) {
    throw error;
  }
};

export default apiRequest;
