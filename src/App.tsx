import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import "./App.css";

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

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BlogProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Redirect from home page to first post */}
              <Route index element={<Navigate to="/post/1" replace />} />
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
