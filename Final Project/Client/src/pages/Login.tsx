import React from 'react';
import Button from '../components/atoms/Button';

interface LoginProps {
  onLogin: () => Promise<void>;
  isLoading?: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading = false }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome to Chat App
          </h1>
          <p className="text-gray-400">
            Sign in to start chatting with others
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onLogin}
            isLoading={isLoading}
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login; 