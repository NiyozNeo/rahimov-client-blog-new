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
  console.log(isAdmin);

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
      <h1>Admin Dashboard</h1>      <div className="dashboard-actions mb-6">
        <Link to="/admin/new">
          <Button variant="default" size="default">
            Create New Post
          </Button>
        </Link>
      </div>

      <div className="posts-table-container">
        <h2>Manage Posts</h2>

        <table className="posts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: Blog) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.createdAt}</td>                <td className="actions space-x-2">
                  <Link
                    to={`/post/${blog.slug}`}
                    className="inline-block"
                  >
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                  <Link
                    to={`/admin/edit/${blog.id}`}
                    className="inline-block"
                  >
                    <Button variant="secondary" size="sm">
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
  );
};

export default AdminDashboard;
