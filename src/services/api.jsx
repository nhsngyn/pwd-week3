//src/services/api.jsx
import axios from 'axios';

const DEFAULT_BASE_URL = 'http://localhost:3000';
const API_BASE_URL = 'https://pwd-week5-nhsngyn.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    console.log('API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export const restaurantAPI = {
  getRestaurants: async () => {
    const response = await api.get('/restaurants');
    return response.data;
  },

  createRestaurant: async (payload) => {
    const response = await api.post('/restaurants', payload);
    return response.data;
  },

  updateRestaurant: async (id, payload) => {
    const response = await api.put(`/restaurants/${id}`, payload);
    return response.data;
  },

  deleteRestaurant: async (id) => {
    const response = await api.delete(`/restaurants/${id}`);
    return response.status;
  },

  getRestaurantById: async (id) => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },

  getPopularRestaurants: async () => {
    const response = await api.get('/restaurants/popular');
    return response.data;
  },
};

export const submissionAPI = {
  createSubmission: async (payload) => {
    const response = await api.post('/submissions', payload);
    return response.data;
  },
  listSubmissions: async (status) => {
    const response = await api.get('/submissions', { params: { status } });
    return response.data;
  },
  updateSubmission: async (id, payload) => {
    const response = await api.put(`/submissions/${id}`, payload);
    return response.data;
  },
  deleteSubmission: async (id) => {
    const response = await api.delete(`/submissions/${id}`);
    return response.status;
  },
};

export default api;
