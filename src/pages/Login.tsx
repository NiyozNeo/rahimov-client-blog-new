import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';
import TelegramLogin from '../components/auth/TelegramLogin';
import { User } from 'lucide-react';
import { useTheme } from '../components/theme-provider';

interface LoginProps {
  returnUrl?: string;
}

const Login: React.FC<LoginProps> = ({ returnUrl }) => {
  const [error, setError] = useState<string>('');
  const { loginWithTelegram } = useBlogContext();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  // The redirect URL to use after successful login
  const redirectUrl = returnUrl || '/post/1';

  // Handle successful Telegram authentication
  const handleTelegramAuth = async (telegramUser: any) => {
    console.log('Telegram User:', telegramUser);
    
    try {
      const success = await loginWithTelegram(telegramUser);
      
      if (success) {
        navigate(redirectUrl);
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  // Check if dark mode is active
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Theme-based styles
  const cardBgClass = isDark ? "bg-[#1E293B]" : "bg-white";
  const borderClass = isDark ? "border-slate-700" : "border-slate-200";
  const textClass = isDark ? "text-slate-200" : "text-slate-800";
  const mutedTextClass = isDark ? "text-slate-400" : "text-slate-500";
  const headerBgClass = isDark ? "bg-purple-700" : "bg-purple-600";
  const formBgClass = isDark ? "bg-[#0D1320]" : "bg-slate-50";
  const textPurpleClass = isDark ? "text-purple-200" : "text-purple-700";
  const highlightTextClass = isDark ? "text-purple-300" : "text-purple-700";
  const iconContainerClass = isDark ? "bg-white/10" : "bg-purple-100";

  return (
    <div className="max-w-md mx-auto">
      {/* Authentication Required Message */}
      <div className={`mb-4 p-4 ${cardBgClass} rounded-lg border ${borderClass}`}>
        <div className="flex items-start gap-2">
          <div className={`${highlightTextClass} flex-shrink-0 mt-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
              <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
            </svg>
          </div>
          <div>
            <h2 className={`text-lg font-medium ${textPurpleClass}`}>Authentication Required</h2>
            <p className={`text-sm ${textClass}`}>
              Please log in with Telegram to read our blog posts. Your Telegram account gives you secure access to all content.
            </p>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className={`${cardBgClass} rounded-lg overflow-hidden border ${borderClass}`}>
        {/* Purple Header */}
        <div className={`${headerBgClass} p-5 text-center`}>
          <div className={`mx-auto ${iconContainerClass} w-12 h-12 rounded-full flex items-center justify-center mb-2`}>
            <User className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">
            Login to Read Posts
          </h1>
          <p className="text-purple-200 text-sm">
            Sign in with Telegram to access all blog content
          </p>
        </div>
        
        <div className="p-5">
          {error && (
            <div className="bg-red-500/10 text-red-400 p-3 rounded-md mb-5 border border-red-500/20 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-5">
            {/* Telegram Login Button */}
            <div className={`py-3 px-4 rounded-md border ${borderClass} ${formBgClass}`}>
              <h3 className={`text-sm font-medium ${textClass} mb-3`}>
                Connect with Telegram
              </h3>
              
              <div className="text-center">
                <TelegramLogin 
                  botName="neotestalfabot"
                  buttonSize="large"
                  cornerRadius={8}
                  usePic={true}
                  requestAccess={true}
                  onAuth={handleTelegramAuth}
                />
              </div>
            </div>
            
            {/* Channel Access Info */}
            <div className={`rounded-md ${formBgClass} p-4 border ${borderClass}`}>
              <h3 className={`text-xs font-medium ${textClass} mb-2`}>Channel Access Required</h3>
              <div className={`space-y-2 text-xs ${mutedTextClass}`}>
                <p>After login, you'll need to join our Telegram channel to access blog posts.</p>
                <p>This helps us ensure content is only available to community members.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;