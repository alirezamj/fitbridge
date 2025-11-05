// src/apiClient.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api' // no static headers here
});

// ✅ Attach token dynamically before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;