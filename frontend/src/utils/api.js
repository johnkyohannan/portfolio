import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
export const apiClient = {
  // Health check
  health: () => api.get('/api/health'),

  // Projects
  getProjects: (featuredOnly = false) => 
    api.get(`/api/projects${featuredOnly ? '?featured_only=true' : ''}`),
  getProject: (id) => api.get(`/api/projects/${id}`),
  createProject: (data) => api.post('/api/projects', data),

  // Certifications
  getCertifications: () => api.get('/api/certifications'),
  createCertification: (data) => api.post('/api/certifications', data),

  // Artwork
  getArtwork: () => api.get('/api/artwork'),
  createArtwork: (data) => api.post('/api/artwork', data),

  // About
  getAbout: () => api.get('/api/about'),
  updateAbout: (data) => api.put('/api/about', data),

  // Contact
  submitContact: (data) => api.post('/api/contact', data),
  getContactMessages: () => api.get('/api/contact'),
};

export default api;