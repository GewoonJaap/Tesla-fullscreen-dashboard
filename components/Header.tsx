import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Zap } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side: Logo/Title */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 p-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg shadow-md">
              <Zap size={20} className="text-white" />
            </div>
            <span className="hidden sm:inline font-bold text-lg text-slate-800 dark:text-slate-200">
              Tesla Fullscreen Portal
            </span>
            <span className="sm:hidden font-bold text-lg text-slate-800 dark:text-slate-200">
              Portal
            </span>
          </div>
          
          {/* Right side: Theme Toggle */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Header;
