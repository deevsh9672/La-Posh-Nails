import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach Bearer token if stored
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('laposh_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle session expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('laposh_admin_token');
        localStorage.removeItem('laposh_admin_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

// Services Endpoints
export const servicesAPI = {
  getAll: (params) => api.get('/services', { params }),
  getById: (identifier) => api.get(`/services/${identifier}`),
  create: (formData) => api.post('/services', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.patch(`/services/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/services/${id}`),
};

// Appointments Endpoints
export const appointmentsAPI = {
  getAvailability: (date, serviceId) => api.get('/appointments/availability', { params: { date, serviceId } }),
  create: (data) => api.post('/appointments', data),
  getAll: (params) => api.get('/appointments', { params }),
  getById: (id) => api.get(`/appointments/${id}`),
  updateStatus: (id, data) => api.patch(`/appointments/${id}/status`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
  getMetrics: () => api.get('/appointments/metrics'),
  getExportUrl: (params) => {
    const query = new URLSearchParams({ ...params, export: 'csv' }).toString();
    const base = import.meta.env.VITE_API_BASE_URL || '/api';
    return `${base}/appointments?${query}`;
  },
};

// Gallery Endpoints
export const galleryAPI = {
  getAll: (params) => api.get('/gallery', { params }),
  create: (formData) => api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.patch(`/gallery/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/gallery/${id}`),
};

// Course Enquiries Endpoints
export const enquiriesAPI = {
  create: (data) => api.post('/course-enquiries', data),
  getAll: (params) => api.get('/course-enquiries', { params }),
  getById: (id) => api.get(`/course-enquiries/${id}`),
  update: (id, data) => api.patch(`/course-enquiries/${id}`, data),
  delete: (id) => api.delete(`/course-enquiries/${id}`),
  getExportUrl: (params) => {
    const query = new URLSearchParams({ ...params, export: 'csv' }).toString();
    const base = import.meta.env.VITE_API_BASE_URL || '/api';
    return `${base}/course-enquiries?${query}`;
  },
};

// Business Settings Endpoints
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.patch('/settings', data),
};

export default api;
