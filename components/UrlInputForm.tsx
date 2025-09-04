import React, { useState } from 'react';
import { Tag, Link, Rocket, Save } from 'lucide-react';

interface UrlInputFormProps {
  onLaunch: (url: string) => void;
  onSave: (name: string, url: string) => void;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ onLaunch, onSave }) => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const handleLaunchClick = () => {
    if (url.trim()) {
      onLaunch(url);
    }
  };

  const handleSaveClick = () => {
    if (url.trim()) {
      onSave(name, url);
      setName('');
      setUrl('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (url.trim()) {
        handleSaveClick();
      }
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-300 dark:border-slate-700 p-6 md:p-8 rounded-2xl shadow-2xl">
      <div className="space-y-6">
        <div className="relative">
          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" size={20} />
          <input
            id="site-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Site Name (optional)"
            className="appearance-none bg-slate-200/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg w-full py-3 pl-12 pr-4 text-slate-900 dark:text-slate-200 leading-tight placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="relative">
          <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" size={20} />
          <input
            id="site-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="URL (e.g., https://news.google.com)"
            className="appearance-none bg-slate-200/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg w-full py-3 pl-12 pr-4 text-slate-900 dark:text-slate-200 leading-tight placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
        <button
          onClick={handleSaveClick}
          disabled={!url.trim()}
          className="flex items-center justify-center px-5 py-3 rounded-lg font-semibold text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/40 dark:text-white dark:border-indigo-500/60 dark:hover:bg-indigo-500/60 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:border-slate-300 dark:disabled:border-slate-600 disabled:text-slate-500 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Save size={16} className="mr-2" />
          Save Site
        </button>
        <button
          onClick={handleLaunchClick}
          disabled={!url.trim()}
          className="flex items-center justify-center px-5 py-3 rounded-lg text-white font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-600/20"
        >
           <Rocket size={16} className="mr-2" />
          Launch Fullscreen
        </button>
      </div>
    </div>
  );
};

export default UrlInputForm;