import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// Helper method to get cookie value
const getCookie = (name: string): string | null => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
};

// Base API URL configuration
if (!process.env.REACT_APP_DEPLOYED_API_URL) {
    throw new Error('Missing REACT_APP_DEPLOYED_API_URL');
}
const API_URL = process.env.REACT_APP_ENVIRONMENT === "development"
    ? process.env.REACT_APP_LOCAL_API_URL
    : process.env.REACT_APP_DEPLOYED_API_URL;

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Important for sending cookies
});

// Request interceptor for API calls
api.interceptors.request.use(
    async (config) => {
      // CSRF Token
      const csrfToken = getCookie('csrftoken');
      if (csrfToken) {
        // Set the CSRF token only if headers object exists
        config.headers = config.headers || {};
        config.headers['X-CSRFToken'] = csrfToken;
      } else {
        throw new Error('CSRF token not found!');
      }
  
      // Auth Token
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        // Set the Auth token only if headers object exists
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Token ${authToken}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );  

export default api;