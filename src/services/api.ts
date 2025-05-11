import axios from "axios";

// Define the base URL for API requests
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Global event for authentication errors
export const authEvents = {
  onAuthError: () => {},
};

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

// Add a response interceptor to handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error("Authentication error:", error.response.data);
      
      // Remove auth data
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      
      // Trigger auth error event
      authEvents.onAuthError();
    }
    
    return Promise.reject(error);
  }
);

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

  // No more adminLogin function with password verification
  // The backend will determine admin status based on the user's Telegram ID
  
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
      const response = await api.get(`/blog/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: localStorage.getItem("auth_token") || "",
        },
      });
      return response.data;
    } catch (error) {
      if(axios.isAxiosError(error) && error.response?.status === 401) {
        console.error("Unauthorized access:", error.response.data);
        return null; // or handle unauthorized access as needed
      }
      // Handle channel membership error (403)
      if(axios.isAxiosError(error) && error.response?.status === 403 && 
         error.response.data?.message === "Access denied: Not a member of the required channel") {
        console.error("Channel access denied:", error.response.data);
        // Return a special error object to indicate channel access issue
        return { error: "channel_access_required" };
      }
      console.error(`Error fetching blog ${id}:`, error);
      throw error;
    }
  },

  getBlogBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/blog/slug/${slug}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: localStorage.getItem("auth_token") || "",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error("Unauthorized access:", error.response.data);
        return null;
      }
      if (axios.isAxiosError(error) && error.response?.status === 403 &&
        error.response.data?.message === "Access denied: Not a member of the required channel") {
        console.error("Channel access denied:", error.response.data);
        return { error: "channel_access_required" };
      }
      console.error(`Error fetching blog with slug ${slug}:`, error);
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
    slug: string;
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
    id: string,    blogData: { title?: string; content?: any; slug?: string }
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
