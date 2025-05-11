import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';
import TelegramLogin from '../components/auth/TelegramLogin';

const AdminLogin: React.FC = () => {
  const { loginWithTelegram } = useBlogContext();
  const navigate = useNavigate();

  // Handle successful Telegram authentication
  const handleTelegramAuth = async (telegramUser: any) => {
    console.log('Admin Login - Telegram User:', telegramUser);
    
    try {
      // The backend will automatically check if this user is an admin
      // and include that information in the response
      const success = await loginWithTelegram(telegramUser);
      
      if (success) {
        // If login was successful, check the user data from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          // If backend confirmed the user is an admin, redirect to dashboard
          if (userData.isAdmin) {
            navigate('/admin/dashboard');
            return;
          }
        }
        
        // If not an admin, redirect to home
        navigate('/');
      }
    } catch (err) {
      console.error('Admin login error:', err);
    }
  };

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      <p>Please log in with your admin Telegram account</p>
      
      <div className="login-container">
        <TelegramLogin 
          botName="neowebappbot"
          buttonSize="large"
          cornerRadius={8}
          usePic={true}
          requestAccess={true}
          onAuth={handleTelegramAuth}
        />
      </div>
    </div>
  );
};

export default AdminLogin;