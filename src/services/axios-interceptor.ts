import axios from 'axios';

const token = localStorage.getItem('token') || sessionStorage.getItem('token');

axios.interceptors.request.use(config => {
  if (config.url.includes('/api')) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axios;