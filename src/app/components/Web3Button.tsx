import React from 'react';

interface Web3ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Web3Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = ''
}: Web3ButtonProps) {
  const baseClasses = "rounded-xl font-medium transition-all duration-200 active:scale-95";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-purple-500/20",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
    outline: "bg-transparent hover:bg-gray-800/50 text-gray-300 border border-gray-700"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
