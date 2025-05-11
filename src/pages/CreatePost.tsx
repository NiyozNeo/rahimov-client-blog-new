import React from 'react';
import { Navigate } from 'react-router-dom';
import PostForm from '../components/blog/PostForm';
import { useBlogContext } from '../context/BlogContext';

const CreatePost: React.FC = () => {
  const { isAdmin } = useBlogContext();
console.log(isAdmin);

  // Redirect if not admin
  if (!isAdmin) {
    console.log("Not an admin, redirecting to /admin");
    
    return <Navigate to="/admin" replace />;
  }

  return <PostForm mode="create" />;
};

export default CreatePost;