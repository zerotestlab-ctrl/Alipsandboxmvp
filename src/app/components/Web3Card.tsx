import React from 'react';

interface Web3CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Web3Card({ children, className = '', hover = false }: Web3CardProps) {
  return (
    <div
      className={`bg-gray-900 border border-gray-800 rounded-2xl p-6 ${
        hover ? 'transition-all duration-200 hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-500/10' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
