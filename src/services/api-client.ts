import axios, { type AxiosInstance } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface ApiOptions {
  requireAuth: boolean;
}

export function createApiClient(
  resourceUrl: string,
  options: ApiOptions = { requireAuth: false },
): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: `${API_URL}/${resourceUrl}`,
  });

  if (options.requireAuth) {
    axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
  return axiosInstance;
}
