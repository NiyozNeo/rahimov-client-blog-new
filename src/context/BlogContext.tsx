import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import api, {  BlogApi } from "../services/api";

interface User {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
  photo_url?: string;
  auth_date: number;
  isAdmin: boolean;
}

interface Blog {
  id: string;
  title: string;
  content: any;
  authorId: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  imageUrl?: string;
}

interface BlogContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  hasChannelAccess: boolean;
  blogs: Blog[];
  selectedPost: Blog | null;
  loginWithTelegram: (authData: any) => Promise<boolean>;
  logout: () => void;
  selectPost: (id: string) => Promise<void>;
  createPost: (blogData: {
    title: string;
    content: any;
    authorName: string;
  }) => Promise<void>;
  updatePost: (
    id: string,
    blogData: { title?: string; content?: any }
  ) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  checkChannelAccess: () => Promise<boolean>;
  fetchBlogs: () => Promise<void>; // Added fetchBlogs to the context type
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedPost, setSelectedPost] = useState<Blog | null>(null);
  const [hasChannelAccess, setHasChannelAccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("auth_token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(parsedUser.isAdmin);
      setIsAuthenticated(true);

      // Verify channel access if user is authenticated
      checkChannelAccess();
    }
  }, []);

  // Load all blogs
  useEffect(() => {
    if (isAuthenticated && hasChannelAccess) {
      fetchBlogs();
    }
  }, [isAuthenticated, hasChannelAccess]);

  const fetchBlogs = async () => {
    try {
      const fetchedBlogs = await BlogApi.getAllBlogs();
      setBlogs(fetchedBlogs);
      return fetchedBlogs; // Return the blogs for direct use
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      return []; // Return empty array on error
    }
  };

  const loginWithTelegram = async (authData: any): Promise<boolean> => {
    try {
      // Using regular api for this since it's not in AuthApi or BlogApi
      console.log("Login data:", authData);

      // Changed from /auth/telegram-login to /telegram/validate-miniapp to match the existing API endpoint
      const response = await api.post("/login/telegram", authData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data.token) {
        // Save user and token
        const userData = {
          ...authData,
          isAdmin: response.data.isAdmin,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("auth_token", response.data.token);

        setUser(userData);
        setIsAdmin(response.data.isAdmin);
        setIsAuthenticated(true);

        // Check channel access after successful login
        await checkChannelAccess();

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    setUser(null);
    setIsAdmin(false);
    setIsAuthenticated(false);
    setHasChannelAccess(false);
    setSelectedPost(null);
  };

  const checkChannelAccess = async (): Promise<boolean> => {
    // Comment out channel access verification - disabled 
    /*
    if (!isAuthenticated) return false;

    try {
      // Always perform a fresh check without relying on cached information
      const hasAccess = await AuthApi.checkChannelAccess();
      setHasChannelAccess(hasAccess);
      return hasAccess;
    } catch (error) {
      // Handle network errors
      if (error instanceof Error && error.message === "Network error when checking channel access") {
        console.error("Network error checking channel access:", error);
      }
      
      console.error("Failed to check channel access:", error);
      setHasChannelAccess(false);
      return false;
    }
    */
    
    // Always return true to bypass channel access check
    setHasChannelAccess(true);
    return true;
  };

  // Memoize selectPost function to prevent infinite re-renders
  const selectPost = useCallback(async (id: string) => {
    try {
      // First check if we already have this post in our blogs array
      const existingPost = blogs.find(blog => blog.id === id);
      
      // If it's the currently selected post, don't fetch again
      if (selectedPost && selectedPost.id === id) {
        return;
      }
      
      // If we have the post in our blogs array but it's not selected yet, set it without fetching
      if (existingPost) {
        // Check if the existing post has full content
        if (existingPost.content) {
          setSelectedPost(existingPost);
          return;
        }
      }
      
      // Otherwise fetch the post
      const post = await BlogApi.getBlogById(id);
      setSelectedPost(post);
    } catch (error) {
      console.error("Failed to fetch blog post:", error);
      setSelectedPost(null);
    }
  }, [blogs, selectedPost]);

  const createPost = async (blogData: {
    title: string;
    content: any;
    authorName: string;
  }) => {
    try {
      await BlogApi.createBlog(blogData);
      fetchBlogs(); // Refresh the list after creation
    } catch (error) {
      console.error("Failed to create blog post:", error);
      throw error;
    }
  };

  const updatePost = async (
    id: string,
    blogData: { title?: string; content?: any }
  ) => {
    try {
      await BlogApi.updateBlog(id, blogData);

      // Update the selected post if it's the one being edited
      if (selectedPost && selectedPost.id === id) {
        selectPost(id);
      }

      fetchBlogs(); // Refresh the list after update
    } catch (error) {
      console.error("Failed to update blog post:", error);
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    try {
      await BlogApi.deleteBlog(id);

      // Reset selected post if it's the one being deleted
      if (selectedPost && selectedPost.id === id) {
        setSelectedPost(null);
      }

      // Update the blogs list
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Failed to delete blog post:", error);
      throw error;
    }
  };

  return (
    <BlogContext.Provider
      value={{
        user,
        isAdmin,
        isAuthenticated,
        hasChannelAccess,
        blogs,
        selectedPost,
        loginWithTelegram,
        logout,
        selectPost,
        createPost,
        updatePost,
        deletePost,
        checkChannelAccess,
        fetchBlogs, // Added fetchBlogs to the context value
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};
