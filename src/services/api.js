import axios from 'axios';

const api = axios.create({
  baseURL: 'http://35.158.239.50:5000',
});

export default api;