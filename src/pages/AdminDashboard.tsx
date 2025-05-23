import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBlogContext } from "../context/BlogContext";
import { Button } from "@/components/ui/button";

// Define Blog type directly in this file instead of importing from BlogContext
interface Blog {
  id: string;
  title: string;
  createdAt: string;
  content?: string; // Make content optional
  slug: string;
}

const AdminDashboard: React.FC = () => {
  const { isAdmin, blogs, deletePost } = useBlogContext();
  const navigate = useNavigate();

  // Redirect if not admin
  if (!isAdmin) {
    navigate("/login");
    return null;
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id);
    }
  };

  return (
    <div className="admin-dashboard mt-2">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Admin Navigation */}
      <div className="admin-nav mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/payments" className="block">
            <div className="p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold mb-2">Payment History</h2>
              <p className="text-gray-600">View and manage payment records</p>
            </div>
          </Link>
          
          <Link to="/admin/users" className="block">
            <div className="p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold mb-2">User Management</h2>
              <p className="text-gray-600">Manage user accounts and permissions</p>
            </div>
          </Link>
          
          <Link to="/admin/subscriptions" className="block">
            <div className="p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-semibold mb-2">Subscriptions</h2>
              <p className="text-gray-600">Manage subscription plans and status</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="posts-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Posts</h2>
          <Link to="/admin/new">
            <Button variant="default" size="default">
              Create New Post
            </Button>
          </Link>
        </div>

        <div className="rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog: Blog) => (
                <tr key={blog.id} className="border-b">
                  <td className="px-4 py-2">{blog.id}</td>
                  <td className="px-4 py-2">{blog.title}</td>
                  <td className="px-4 py-2">{blog.createdAt}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      to={`/${blog.slug}`}
                      className="text-primary hover:text-primary/80"
                    >
                      <Button variant="default" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link
                      to={`/admin/edit/${blog.id}`}
                      className="inline-block"
                    >
                      <Button variant="default" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
