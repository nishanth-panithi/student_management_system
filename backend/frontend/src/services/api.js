/**
 * API Service - Handles all API calls to Django backend
 */

const API_BASE_URL = 'http://localhost:8000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Get headers with authentication
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Handle API response
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || error.message || 'Request failed');
  }
  return response.json();
};

// Authentication APIs
export const authAPI = {
  // Login
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },

  // Logout
  logout: async (refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    return handleResponse(response);
  },
};

// Student APIs
export const studentAPI = {
  // Get all students
  getAll: async (searchQuery = '') => {
    const url = searchQuery
      ? `${API_BASE_URL}/students/?search=${encodeURIComponent(searchQuery)}`
      : `${API_BASE_URL}/students/`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Get student by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  // Create student
  create: async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/students/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(studentData),
    });
    return handleResponse(response);
  },

  // Update student
  update: async (id, studentData) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(studentData),
    });
    return handleResponse(response);
  },

  // Delete student
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (response.ok) {
      return { message: 'Student deleted successfully' };
    }
    return handleResponse(response);
  },

  // Search students
  search: async (query) => {
    const response = await fetch(`${API_BASE_URL}/students/search/?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

