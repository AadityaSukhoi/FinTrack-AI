import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

// ==================== USER PROFILE ====================

export const createProfile = (data: any) =>
  api.post("/categories/profile", data);

export const getProfile = () =>
  api.get("/categories/profile");

export const updateProfile = (data: any) =>
  api.put("/categories/profile", data);

// ==================== TRANSACTIONS ====================

export const getTransactions = (params?: any) =>
  api.get("/transactions", { params });

export const createTransaction = (data: any) =>
  api.post("/transactions", data);

export const updateTransaction = (id: string, data: any) =>
  api.put(`/transactions/${id}`, data);

export const deleteTransaction = (id: string) =>
  api.delete(`/transactions/${id}`);

// ==================== DASHBOARD ====================

export const getDashboardSummary = () =>
  api.get("/categories/summary");

export const getAIInsights = () =>
  api.get("/categories/insights");

// ==================== CATEGORIES ====================

export const getCategories = (type?: "income" | "expense") =>
  api.get("/categories", { params: { type } });

export const createCategory = (data: any) =>
  api.post("/categories", data);

export const deleteCategory = (id: string) =>
  api.delete(`/categories/${id}`);

// ==================== BUDGETS ====================

export const getBudgets = () =>
  api.get("/budgets");

export const createBudget = (data: any) =>
  api.post("/budgets", data);

export const updateBudget = (id: string, data: any) =>
  api.put(`/budgets/${id}`, data);

export const deleteBudget = (id: string) =>
  api.delete(`/budgets/${id}`);

// ==================== FORECASTING ====================

export const getForecast = () =>
  api.get("/dashboard/forecast");

// ==================== REPORTS ====================

export const getReports = (months: number = 6) =>
  api.get(`/reports?months=${months}`);

export default api;