import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';

// Define Blog type directly in this file instead of importing from BlogContext
interface Blog {
  id: string;
  title: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const { isAdmin, blogs, deletePost } = useBlogContext();
  const navigate = useNavigate();

  // Redirect if not admin
  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-actions">
        <Link to="/admin/new" className="button">Create New Post</Link>
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
                <td>{blog.createdAt}</td>
                <td className="actions">
                  <Link to={`/post/${blog.id}`} className="button view-button">View</Link>
                  <Link to={`/admin/edit/${blog.id}`} className="button edit-button">Edit</Link>
                  <button 
                    onClick={() => handleDelete(blog.id)} 
                    className="button delete-button">
                    Delete
                  </button>
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