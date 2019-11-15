import axios from 'axios';

const api = axios.create({
  baseURL: 'https://unichat.xyz',
});

export default api;