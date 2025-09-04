import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
        Tesla Fullscreen Portal
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
        Launch any website in your Tesla's browser in fullscreen mode.
      </p>
    </header>
  );
};

export default Header;