import axios from 'axios';

// Create an Axios instance with the base URL of your backend
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8789/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
