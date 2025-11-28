import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (redirect to login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// ==================== USER PROFILE ====================
export const createProfile = (data: { initial_balance: number; monthly_budget: number }) =>
  api.post('/categories/profile', data);

export const getProfile = () =>
  api.get('/categories/profile');

export const updateProfile = (data: any) =>
  api.put('/categories/profile', data);

// ==================== TRANSACTIONS ====================
export const getTransactions = (params?: any) =>
  api.get('/transactions', { params });

export const createTransaction = (data: any) =>
  api.post('/transactions', data);

export const updateTransaction = (id: string, data: any) =>
  api.put(`/transactions/${id}`, data);

export const deleteTransaction = (id: string) =>
  api.delete(`/transactions/${id}`);

// ==================== DASHBOARD ====================
export const getDashboardSummary = () =>
  api.get('/categories/summary');

export const getAIInsights = () =>
  api.get('/categories/insights');

// ==================== CATEGORIES ====================
export const getCategories = (type?: 'income' | 'expense') =>
  api.get('/categories', { params: { type } });

export const createCategory = (data: any) =>
  api.post('/categories', data);

export const deleteCategory = (id: string) =>
  api.delete(`/categories/${id}`);

// ==================== BUDGETS ====================

// GET all budgets
export const getBudgets = () => api.get("/budgets");

// CREATE a budget
export const createBudget = (data: any) =>
  api.post("/budgets", data);

// UPDATE a budget
export const updateBudget = (id: string, data: any) =>
  api.put(`/budgets/${id}`, data);

// DELETE a budget
export const deleteBudget = (id: string) => 
  api.delete(`/budgets/${id}`);

export const getForecast = () =>
  api.get('/dashboard/forecast');

export default api;