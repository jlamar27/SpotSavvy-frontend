import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// Base API URL configuration
if (!process.env.REACT_APP_DEPLOYED_API_URL) {
    throw new Error('Missing REACT_APP_DEPLOYED_API_URL');
}
const API_URL = process.env.REACT_APP_ENVIRONMENT === "development"
    ? process.env.REACT_APP_LOCAL_API_URL
    : process.env.REACT_APP_DEPLOYED_API_URL;

// Create axios instance
const api = axios.create({
    baseURL: API_URL
});

export default api;