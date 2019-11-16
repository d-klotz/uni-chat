import axios from 'axios';
import { config } from '../constants'; 

const api = axios.create({
  baseURL: config.url.API_URL,
});

export default api;