import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('taskflow_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    register: (name, email, password) =>
        apiClient.post('/auth/register', { name, email, password }),
    login: (email, password) =>
        apiClient.post('/auth/login', { email, password }),
};

// Tasks API
export const tasksAPI = {
    getAll: () => apiClient.get('/tasks'),
    getById: (id) => apiClient.get(`/tasks/${id}`),
    create: (task) => apiClient.post('/tasks', task),
    update: (id, task) => apiClient.put(`/tasks/${id}`, task),
    delete: (id) => apiClient.delete(`/tasks/${id}`),
};

export default apiClient;
