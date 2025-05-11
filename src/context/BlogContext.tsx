import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import api, { BlogApi, authEvents } from "../services/api";
import { defaultPublicPost } from "../data/blogData";

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
  slug: string;
  isPublic?: boolean;
  date?: string;
  author?: string;
  error?: string;
}

interface BlogContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  hasChannelAccess: boolean;
  blogs: Blog[];
  selectedPost: Blog | null;
  showLoginModal: boolean;
  isChannelMembershipRequired: boolean;
  loginWithTelegram: (authData: any) => Promise<boolean>;
  logout: () => void;
  selectPost: (id: string) => Promise<void>;
  selectPostBySlug: (slug: string) => Promise<void>;
  createPost: (blogData: {
    title: string;
    content: any;
    authorName: string;
    slug: string;
  }) => Promise<void>;
  updatePost: (
    id: string,
    blogData: { title?: string; content?: any; slug?: string }
  ) => Promise<Blog>;
  deletePost: (id: string) => Promise<void>;
  checkChannelAccess: () => Promise<boolean>;
  fetchBlogs: () => Promise<Blog[]>;
  closeLoginModal: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedPost, setSelectedPost] = useState<Blog | null>(null);
  const [hasChannelAccess, setHasChannelAccess] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isChannelMembershipRequired, setIsChannelMembershipRequired] = useState<boolean>(false);

  // Setup the auth error listener
  useEffect(() => {
    const handleAuthError = () => {
      console.log("Auth error detected, showing login modal");
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      setHasChannelAccess(false);
      setShowLoginModal(true);
    };

    authEvents.onAuthError = handleAuthError;

    return () => {
      authEvents.onAuthError = () => {};
    };
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("auth_token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Parsed user:", parsedUser);
      
      setUser(parsedUser);
      setIsAdmin(parsedUser.isAdmin);
      setIsAuthenticated(true);

      // Verify channel access if user is authenticated
      checkChannelAccess();
    }
  }, []);

  // Load all blogs
  useEffect(() => {
    console.log("Fetching blogs after authentication and channel access check");
    void fetchBlogs();
  }, [isAuthenticated, hasChannelAccess]);

  const fetchBlogs = async () => {
    try {
      const fetchedBlogs = await BlogApi.getAllBlogs();
      console.log("Fetched blogs:", fetchedBlogs);
      
      // Add the default public post to the beginning of the blogs array
      const allBlogs = [{
        ...defaultPublicPost,
        id: defaultPublicPost.id.toString(),
        createdAt: defaultPublicPost.date,
        updatedAt: defaultPublicPost.date,
        authorId: 0,
        authorName: defaultPublicPost.author,
        isPublic: true // Ensure the welcome post is marked as public
      }, ...fetchedBlogs];
      
      // Sort blogs so public posts appear first, then by date
      allBlogs.sort((a, b) => {
        if (a.isPublic && !b.isPublic) return -1;
        if (!a.isPublic && b.isPublic) return 1;
        const dateA = new Date(a.createdAt || a.date || '');
        const dateB = new Date(b.createdAt || b.date || '');
        return dateB.getTime() - dateA.getTime();
      });
      
      setBlogs(allBlogs);
      return allBlogs;
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      // Even if the fetch fails, still show the default public post
      const fallbackBlogs = [{
        ...defaultPublicPost,
        id: defaultPublicPost.id.toString(),
        createdAt: defaultPublicPost.date,
        updatedAt: defaultPublicPost.date,
        authorId: 0,
        authorName: defaultPublicPost.author,
        isPublic: true
      }];
      setBlogs(fallbackBlogs);
      return fallbackBlogs;
    }
  };

  const loginWithTelegram = async (authData: any): Promise<boolean> => {
    try {
      console.log("Login data:", authData);

      const response = await api.post("/login/telegram", authData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data.token) {
        const userData = {
          ...authData,
          isAdmin: response.data.isAdmin,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("auth_token", response.data.token);

        setUser(userData);
        setIsAdmin(response.data.isAdmin);
        setIsAuthenticated(true);
        setShowLoginModal(false);

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

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const checkChannelAccess = async (): Promise<boolean> => {
    setHasChannelAccess(true);
    return true;
  };

  const selectPost = useCallback(async (id: string) => {
    try {
      const post = await BlogApi.getBlogById(id);
      
      if (post && post.error === "channel_access_required") {
        throw post;
      }
      
      if (post === null && !isAuthenticated) {
        setShowLoginModal(true);
      } else {
        setSelectedPost(post);
      }
    } catch (error) {
      console.error("Failed to fetch blog post:", error);
      setSelectedPost(null);
      throw error;
    }
  }, [isAuthenticated]);
  const selectPostBySlug = useCallback(async (slug: string) => {
    try {
      setIsChannelMembershipRequired(false); // reset before each fetch
      if (slug === defaultPublicPost.slug) {
        setSelectedPost({
          ...defaultPublicPost,
          id: defaultPublicPost.id.toString(),
          createdAt: defaultPublicPost.date,
          updatedAt: defaultPublicPost.date,
          authorId: 0,
          authorName: defaultPublicPost.author,
          isPublic: true
        });
        return;
      }

      // Check if we already have the post in our blogs array
      // const existingPost = blogs.find(blog => blog.slug === slug);
      // if (selectedPost && selectedPost.slug === slug) {
      //   return;
      // }
      // if (existingPost?.content) {
      //   if (existingPost.isPublic || isAuthenticated) {
      //     setSelectedPost(existingPost);
      //     return;
      //   }
      // }
      // Fetch from API
      const post = await BlogApi.getBlogBySlug(slug);
      if (post?.isPublic) {
        setSelectedPost(post);
        return;
      }
      if (post && post.error === "channel_access_required") {
        setIsChannelMembershipRequired(true);
        setSelectedPost(null);
        throw post;
      }
      if ((post && isAuthenticated) || (post?.isPublic)) {
        setSelectedPost(post);
      } else {
        setSelectedPost(null); // Do not fallback to default public post for other slugs
      }
    } catch (error) {
      console.error("Failed to fetch blog post by slug:", error);
      setSelectedPost(null);
      throw error;
    }
  }, [blogs, selectedPost, isAuthenticated]);

  const createPost = async (blogData: {
    title: string;
    content: any;
    authorName: string;
    slug: string;
  }) => {
    try {
      await BlogApi.createBlog(blogData);
      void fetchBlogs(); // Add void operator to handle the Promise
    } catch (error) {
      console.error("Failed to create blog post:", error);
      throw error;
    }
  };

  const updatePost = async (
    id: string,
    blogData: { title?: string; content?: any; slug?: string }
  ): Promise<Blog> => {
    try {
      const updatedPost = await BlogApi.updateBlog(id, blogData);

      if (selectedPost && selectedPost.id === id) {
        setSelectedPost(updatedPost);
      }

      setBlogs(prevBlogs => prevBlogs.map(blog => 
        blog.id === id ? updatedPost : blog
      ));

      return updatedPost;
    } catch (error) {
      console.error("Failed to update blog post:", error);
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    try {
      await BlogApi.deleteBlog(id);

      if (selectedPost && selectedPost.id === id) {
        setSelectedPost(null);
      }

      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
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
        showLoginModal,
        loginWithTelegram,
        logout,
        selectPost,
        selectPostBySlug,
        createPost,
        updatePost,
        deletePost,
        checkChannelAccess,
        fetchBlogs,
        closeLoginModal,
        isChannelMembershipRequired, // expose to context
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
