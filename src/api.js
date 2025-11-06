
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Assuming the backend runs on port 5000

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      config.headers.token = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth
export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);

// Cars
export const getAllCars = () => api.get('/cars/all');
export const getCarById = (carId) => api.get(`/cars/${carId}`);
export const addCar = (carData) => api.post('/cars/add', carData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Bookings
export const bookCar = (bookingData) => api.post('/bookings/book', bookingData);
export const getMyBookings = (userId) => api.get(`/bookings/my-bookings/${userId}`);
export const cancelBooking = (bookingId) => api.put(`/bookings/cancel/${bookingId}`);

export default api;
