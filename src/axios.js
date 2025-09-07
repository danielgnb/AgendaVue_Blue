import axios from 'axios';
import Swal from 'sweetalert2';

const instance = axios.create({
  baseURL: 'https://localhost:7052',
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const currentRoute = window.location.pathname;
      if (currentRoute !== '/login' || currentRoute !== '/') {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        Swal.fire("Atenção", "Sua sessão expirou.", "warning");
      }
    }

    return Promise.reject(error);
  }
);

export default instance;