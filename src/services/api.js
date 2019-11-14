import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ec2-3-124-116-182.eu-central-1.compute.amazonaws.com:5000',
});

export default api;