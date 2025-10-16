import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação (token expirado)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Se o erro for 401 (Unauthorized) e não for uma tentativa de refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Tenta renovar o token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // Se não houver refresh token, redireciona para login
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        const response = await axios.post(`${API_URL}/api/token/refresh/`, {
          refresh: refreshToken,
        });
        
        // Salva o novo token
        localStorage.setItem('token', response.data.access);
        
        // Refaz a requisição original com o novo token
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Se falhar ao renovar o token, limpa o storage e redireciona para login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  login: async (username, password) => {
    const response = await api.post('/api/token/', { username, password });
    return response.data;
  },
  
  register: async (username, email, password) => {
    const response = await api.post('/api/register/', { username, email, password });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
};

// Serviços de ativos
export const assetService = {
  getAll: async () => {
    const response = await api.get('/api/assets/');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/api/assets/${id}/`);
    return response.data;
  },
  
  create: async (assetData) => {
    const response = await api.post('/api/assets/', assetData);
    return response.data;
  },
  
  update: async (id, assetData) => {
    const response = await api.put(`/api/assets/${id}/`, assetData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/api/assets/${id}/`);
    return response.data;
  },
};

// Serviços de transações
export const transactionService = {
  getAll: async () => {
    const response = await api.get('/api/transactions/');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/api/transactions/${id}/`);
    return response.data;
  },
  
  create: async (transactionData) => {
    const response = await api.post('/api/transactions/', transactionData);
    return response.data;
  },
  
  update: async (id, transactionData) => {
    const response = await api.put(`/api/transactions/${id}/`, transactionData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/api/transactions/${id}/`);
    return response.data;
  },
};

// Serviços de portfólio
export const portfolioService = {
  getSummary: async () => {
    const response = await api.get('/api/portfolio/summary/');
    return response.data;
  },
  
  getPortfolio: async () => {
    const response = await api.get('/api/portfolio/');
    return response.data;
  },
};

export default api;