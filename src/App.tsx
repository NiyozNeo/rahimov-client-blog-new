import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";

// Layout
import Layout from "./components/layout/Layout";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Logout from "./pages/Logout";
import HomePage from "./pages/HomePage";

// Components
import PostDetail from "./components/blog/PostDetail";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BlogProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path=":slug" element={<PostDetail />} />
              <Route path="login" element={<Login />} />
              <Route path="admin" element={<Login />} />
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
