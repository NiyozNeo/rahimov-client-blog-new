import React, { useEffect, useRef } from 'react';

interface TelegramLoginProps {
  botName: string;
  onAuth: (user: any) => void;
  buttonSize?: 'large' | 'medium' | 'small';
  cornerRadius?: number;
  requestAccess?: boolean;
  usePic?: boolean;
}

declare global {
  interface Window {
    [key: string]: any;
  }
}

const TelegramLogin: React.FC<TelegramLoginProps> = ({
  botName,
  buttonSize = 'large',
  cornerRadius = 5,
  requestAccess = true,
  usePic = true,
  onAuth
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Use a fixed callback name instead of a random one
  const callbackId = 'TelegramLoginCallback';

  useEffect(() => {
    // Clear any existing script elements
    if (wrapperRef.current) {
      wrapperRef.current.innerHTML = '';
    }

    // Create the Telegram script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', buttonSize);
    script.setAttribute('data-radius', cornerRadius.toString());
    script.setAttribute('data-request-access', requestAccess ? 'write' : 'read');
    script.setAttribute('data-userpic', usePic.toString());
    script.setAttribute('data-onauth', `window.${callbackId}(user)`);
    script.async = true;

    // Create global callback
    window[callbackId] = (user: any) => {
      if (onAuth) {
        onAuth(user);
      }
    };

    // Append to wrapper
    if (wrapperRef.current) {
      wrapperRef.current.appendChild(script);
    }

    // Cleanup
    return () => {
      delete window[callbackId as keyof typeof window];
    };
  }, [botName, buttonSize, cornerRadius, requestAccess, usePic, onAuth, callbackId]);

  return <div ref={wrapperRef}></div>;
};

export default TelegramLogin;