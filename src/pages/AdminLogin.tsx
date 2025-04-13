import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { loginWithTelegram } = useBlogContext(); // Use loginWithTelegram instead
  const navigate = useNavigate();

  // In a real app, you would use proper authentication.
  // This is just for demo purposes.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === 'admin') { // Simple password for demo
      // Simulate admin login with mock data
      const adminMockData = {
        id: 123,
        first_name: "Admin",
        auth_date: Math.floor(Date.now() / 1000),
        hash: "admin_hash"
      };
      loginWithTelegram(adminMockData);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="help-text">Use 'admin' for demo purposes</p>
        </div>
        
        <button type="submit" className="button login-button">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;