import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "../context/BlogContext";
import TelegramLogin from "../components/auth/TelegramLogin";
import { Shield } from "lucide-react";

// Get bot name from environment variable with fallback
const TELEGRAM_BOT_NAME = import.meta.env.VITE_TELEGRAM_BOT_NAME || "parallelmuhit_bot";

interface LoginProps {
  returnUrl?: string;
}

const Login: React.FC<LoginProps> = ({ returnUrl }) => {
  const { loginWithTelegram } = useBlogContext();
  const navigate = useNavigate();

  // The redirect URL to use after successful login
  const redirectUrl = returnUrl || "/";

  // Handle successful Telegram authentication
  const handleTelegramAuth = async (telegramUser: any) => {
    try {
      const success = await loginWithTelegram(telegramUser);

      if (success) {
        // Check if user is admin from localStorage after login
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);

          // If admin, redirect to admin dashboard instead of home
          if (userData.isAdmin) {
            navigate("/admin/dashboard");
            return;
          }
        }

        // Otherwise, use the regular redirect URL
        navigate(redirectUrl);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] max-w-md">
      <h2 className={`text-xl font-bold mb-2 flex items-center`}>
        <Shield className={`h-5 w-5 mr-2`} />
        Login qilishingiz zarur
      </h2>
      <p className="mb-4 text-center">
        Bu inshomizni o‘qishingiz uchun Telegram orqali login qilishingizni so‘raymiz
      </p>
      <div className="">
        <TelegramLogin
          botName={TELEGRAM_BOT_NAME}
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
