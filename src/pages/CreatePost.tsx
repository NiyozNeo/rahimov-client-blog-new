import React from 'react';
import { Navigate } from 'react-router-dom';
import PostForm from '../components/blog/PostForm';
import { useBlogContext } from '../context/BlogContext';

const CreatePost: React.FC = () => {
  const { isAdmin } = useBlogContext();
  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <PostForm mode="create" />;
};

export default CreatePost;