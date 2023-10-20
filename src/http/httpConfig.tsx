// Packages
import axios from "axios";


// Based on environment set api url
const YELP_API_URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/";
const apiKey = process.env.REACT_APP_YELP_TOKEN;


// Create a re-useable axios object, with our API as the baseURL

const yelp = axios.create({
  baseURL: YELP_API_URL,
});

// Interceptors are axios functionality, that allows you to intercept requests and responses
// Here we're setting the token in localstorage to the Authorization header

yelp.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${apiKey}`;
  config.headers["x-requested-with"] = "xmlhttprequest";
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
});

// Export api

export default yelp;

