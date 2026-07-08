import axios from 'axios';
import { getToken } from './storageService';
import { getConfig } from './config';

// Get configuration based on environment
const { API_BASE_URL, timeout } = getConfig();

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`Making request to: ${config.baseURL}${config.url}`);
  return config;
});

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}: ${response.status}`);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - serverless function may be cold starting');
    } else if (error.response) {
      console.error(`API Error: ${error.response.status} - ${error.response.data?.message || error.message}`);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);