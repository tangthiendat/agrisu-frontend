import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
export function createApiClient(resourceUrl) {
  const axiosInstance = axios.create({
    baseURL: `${BASE_URL}${resourceUrl}`,
  });

  return axiosInstance;
}
