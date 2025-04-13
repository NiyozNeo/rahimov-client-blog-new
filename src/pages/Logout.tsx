import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';

const Logout: React.FC = () => {
  const { logout } = useBlogContext();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/" replace />;
};

export default Logout;