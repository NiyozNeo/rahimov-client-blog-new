import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import "./App.css";
import { useEffect, useState } from "react";
import { useBlogContext } from "./context/BlogContext";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Logout from "./pages/Logout";

// Components
import PostDetail from "./components/blog/PostDetail";
import { ThemeProvider } from "./components/theme-provider";

// Component to handle redirect to first blog
const RedirectToFirstBlog = () => {
  const { blogs, fetchBlogs } = useBlogContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        await fetchBlogs();
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs for redirect:", error);
        setIsLoading(false);
      }
    };
    
    loadBlogs();
  }, [fetchBlogs]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // If we have blogs, redirect to the first one
  if (blogs && blogs.length > 0) {
    return <Navigate to={`/post/${blogs[0].id}`} replace />;
  }
  
  // Display message when no blogs are available instead of redirecting
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-8 bg-card rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-2">No blog posts yet</h2>
        <p className="text-muted-foreground">Check back soon for new content.</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BlogProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Dynamic redirect based on available blogs */}
              <Route index element={<RedirectToFirstBlog />} />
              <Route path="post/:id" element={<PostDetail />} />
              <Route path="login" element={<Login />} />
              <Route path="admin" element={<Login />} /> {/* Redirect old admin path to login */}
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/new" element={<CreatePost />} />
              <Route path="admin/edit/:id" element={<EditPost />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BlogProvider>
    </ThemeProvider>
  );
};

export default App;
