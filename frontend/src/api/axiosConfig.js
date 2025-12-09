import axios from 'axios';

const api = axios.create({
  // URL Backend yang benar (sesuai main.py)
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;