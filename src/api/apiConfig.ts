import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// Function to get the value of a cookie
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

// Base API URL configuration
if (!process.env.REACT_APP_DEPLOYED_API_URL) {
  throw new Error('Missing REACT_APP_DEPLOYED_API_URL');
}
const API_URL = process.env.REACT_APP_ENVIRONMENT === "development"
  ? process.env.REACT_APP_LOCAL_API_URL
  : process.env.REACT_APP_DEPLOYED_API_URL;

// Create axios instance with base URL and credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true // important to include with every request
});

export const getCsrfToken = async () => {
  try {
    // Make a request to the server endpoint that provides the CSRF token.
    // The server should set a cookie containing the CSRF token in response to this request.
    await api.get('/get-csrf-token/'); // this should be your server endpoint for initializing a session and getting a CSRF token
  } catch (error) {
    console.error('Could not get CSRF token', error);
  }
};

// Set the CSRF token for each request
api.interceptors.request.use(request => {
  const csrfToken = localStorage.getItem('csrf_token');
  request.headers['X-CSRFToken'] = csrfToken;
  return request;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(response => {
  // Any status code that lies within the range of 2xx will cause this function to trigger
  return response;
}, error => {
  // Any status codes that falls outside the range of 2xx will cause this function to trigger
  if (error.response && error.response.status === 403) {
    console.error('CSRF token validation failed:', error.response);
  }
  return Promise.reject(error);
});

export default api;