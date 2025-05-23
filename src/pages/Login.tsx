import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';
import TelegramLogin from '../components/auth/TelegramLogin';

interface LoginProps {
  returnUrl?: string;
}

const Login: React.FC<LoginProps> = ({ returnUrl }) => {
  const { loginWithTelegram } = useBlogContext();
  const navigate = useNavigate();
  
  // The redirect URL to use after successful login
  const redirectUrl = returnUrl || '/';

  // Handle successful Telegram authentication
  const handleTelegramAuth = async (telegramUser: any) => {
    console.log('Telegram User:', telegramUser);
    
    try {
      const success = await loginWithTelegram(telegramUser);
      
      if (success) {
        // Check if user is admin from localStorage after login
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          // If admin, redirect to admin dashboard instead of home
          if (userData.isAdmin) {
            navigate('/admin/dashboard');
            return;
          }
        }
        
        // Otherwise, use the regular redirect URL
        navigate(redirectUrl);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h3 className="text-center font-medium mb-4">Connect with Telegram</h3>
      
      <div className="text-center">
        <TelegramLogin 
          botName="itlyceumbot"
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

export default Login;