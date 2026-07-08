// Configuration for different environments
export const config = {
  development: {
    API_BASE_URL: 'http://192.168.8.118:5000/api',
    timeout: 10000,
  },
  production: {
    API_BASE_URL: 'https://cfc-freight.vercel.app/api',
    timeout: 15000,
  },
};

// Get current environment (defaults to production for safety)
export const getCurrentEnvironment = () => {
  // You can check for __DEV__ in React Native or use your own logic
  if (__DEV__) {
    return 'development';
  }
  return 'production';
};

export const getConfig = () => {
  const env = getCurrentEnvironment();
  return config[env];
};