import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { User } from 'firebase/auth';
import Button from '../components/atoms/Button';

interface MainLayoutProps {
  user: User | null;
  onLogout: () => void;
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Chat App
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <span className="text-sm text-gray-300">
                    {user.displayName}
                  </span>
                  <Button
                    variant="danger"
                    onClick={onLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default MainLayout; 