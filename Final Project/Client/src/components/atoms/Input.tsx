import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  isLoading?: boolean;
}

const Input: React.FC<InputProps> = ({
  error,
  label,
  isLoading,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={twMerge(
            'w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
            error ? 'border-red-500 focus:ring-red-500' : '',
            isLoading ? 'opacity-50 cursor-not-allowed' : '',
            className
          )}
          disabled={isLoading}
          {...props}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input; 