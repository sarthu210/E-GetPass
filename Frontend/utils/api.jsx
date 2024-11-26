import axios from 'axios';

const api = axios.create({
  baseURL: 'https://e-get-pass.vercel.app',
  withCredentials: true, // Include credentials (cookies) in requests
});

export default api;