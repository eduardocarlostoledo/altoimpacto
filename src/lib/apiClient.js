import axios from "axios";

const DEFAULT_PROD_API_URL = "https://globalhomegroup-backend-production.up.railway.app";
const DEFAULT_LOCAL_API_URL = "http://localhost:3001";

const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");

const isLocalHost = (hostname = "") =>
  hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";

const resolveApiBaseUrl = () => {
  const configuredUrl = trimTrailingSlash(import.meta.env.VITE_API_URL || "");

  if (typeof window === "undefined") {
    return configuredUrl || DEFAULT_PROD_API_URL;
  }

  if (isLocalHost(window.location.hostname)) {
    return configuredUrl || DEFAULT_LOCAL_API_URL;
  }

  if (!configuredUrl || configuredUrl.includes("localhost")) {
    return DEFAULT_PROD_API_URL;
  }

  return configuredUrl;
};

export const API_BASE_URL = resolveApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  allowAbsoluteUrls: false,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

apiClient.interceptors.request.use((config) => {
  const requestUrl = String(config.url || "");

  if (!requestUrl.startsWith("/api/")) {
    return Promise.reject(new Error(`Blocked unexpected API request URL: ${requestUrl}`));
  }

  return config;
});

export default apiClient;
