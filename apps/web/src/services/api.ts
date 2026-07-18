import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('codepulse.token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.localStorage.removeItem('codepulse.token');
    }
    return Promise.reject(error);
  }
);
