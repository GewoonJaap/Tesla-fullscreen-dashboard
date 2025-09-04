import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl mx-auto mt-20 text-center text-slate-500 dark:text-slate-500 text-sm py-6 border-t border-slate-200 dark:border-slate-800">
      <p>
        This portal uses the YouTube redirect method to enable fullscreen browsing.
      </p>
      <p>
        Not affiliated with Tesla or any of the listed services.
      </p>
    </footer>
  );
};

export default Footer;