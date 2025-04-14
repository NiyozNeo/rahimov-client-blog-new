import axios from "axios";

// Define the base URL for API requests
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    token: localStorage.getItem("auth_token") || "",
    Accept: "application/json",
  },
});

// Add request interceptor to include auth token in headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthApi = {
  validateMiniApp: async (initData: string) => {
    try {
      const response = await api.post("/telegram/validate-miniapp", {
        initData,
      });
      return response.data;
    } catch (error) {
      console.error("Validation error:", error);
      throw error;
    }
  },

  checkChannelAccess: async (): Promise<boolean> => {
    try {
      const response = await api.get("/telegram/check-channel-access", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: localStorage.getItem("auth_token") || "",
        },
      });
      console.log("Channel access response:", response.data);
      

      if (response.data && typeof response.data.hasAccess === 'boolean') {
        return response.data.hasAccess;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Channel access check error:", error);
      
      // If it's an authorization error, return false
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      
      // For network errors, throw to let the caller handle it
      if (axios.isAxiosError(error) && !error.response) {
        throw new Error("Network error when checking channel access");
      }
      
      // For any other error, return false
      return false;
    }
  },

  logout: async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },
};

export const BlogApi = {
  getAllBlogs: async () => {
    try {
      const response = await api.get("/blog");
      return response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
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
      const response = await api.get("/blog/my-blogs");
      return response.data;
    } catch (error) {
      console.error("Error fetching my blogs:", error);
      throw error;
    }
  },

  createBlog: async (blogData: {
    title: string;
    content: any;
    authorName: string;
  }) => {
    try {
      const response = await api.post("/blog", blogData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: localStorage.getItem("auth_token") || "",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },

  updateBlog: async (
    id: string,
    blogData: { title?: string; content?: any }
  ) => {
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
  },
};

export default api;
