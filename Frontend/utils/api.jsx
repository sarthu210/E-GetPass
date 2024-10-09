import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.198.253:3000',
  withCredentials: true, // Include credentials (cookies) in requests
});

export default api;