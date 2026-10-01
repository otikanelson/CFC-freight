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
  try {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (__DEV__) {
      console.log(`Making request to: ${config.baseURL}${config.url}`);
    }
  } catch (error) {
    // Silent fail - don't block the request
  }
  return config;
});

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`Response from ${response.config.url}: ${response.status}`);
    }
    return response;
  },
  (error) => {
    if (__DEV__) {
      if (error.code === 'ECONNABORTED') {
        console.error('Request timeout - serverless function may be cold starting');
      } else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
        console.error('Network Error - Check internet connection');
      } else if (error.response) {
        console.error(`API Error: ${error.response.status} - ${error.response.data?.message || error.message}`);
      } else {
        console.error('API Error:', error.message);
      }
    }
    return Promise.reject(error);
  }
);