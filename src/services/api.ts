import axios from 'axios';

// Define the base URL for API requests
const API_BASE_URL = 'http://localhost:3000';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthApi = {
  validateMiniApp: async (initData: string) => {
    try {
      const response = await api.post('/telegram/validate-miniapp', { initData });
      return response.data;
    } catch (error) {
      console.error('Validation error:', error);
      throw error;
    }
  },

  checkChannelAccess: async () => {
    try {
      const response = await api.get('/telegram/check-channel-access');
      return response.data.hasAccess;
    } catch (error) {
      console.error('Channel access check error:', error);
      return false;
    }
  },

  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const BlogApi = {
  getAllBlogs: async () => {
    try {
      const response = await api.get('/blog');
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  getBlogById: async (id: string) => {
    try {
      const response = await api.get(`/blog/id/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog ${id}:`, error);
      throw error;
    }
  },

  getMyBlogs: async () => {
    try {
      const response = await api.get('/blog/my-blogs');
      return response.data;
    } catch (error) {
      console.error('Error fetching my blogs:', error);
      throw error;
    }
  },

  createBlog: async (blogData: { title: string; content: any; authorName: string }) => {
    try {
      const response = await api.post('/blog', blogData);
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  updateBlog: async (id: string, blogData: { title?: string; content?: any }) => {
    try {
      const response = await api.put(`/blog/${id}`, blogData);
      return response.data;
    } catch (error) {
      console.error(`Error updating blog ${id}:`, error);
      throw error;
    }
  },

  deleteBlog: async (id: string) => {
    try {
      const response = await api.delete(`/blog/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting blog ${id}:`, error);
      throw error;
    }
  }
};

export default api;