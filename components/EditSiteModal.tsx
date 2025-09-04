import React, { useState, useEffect } from 'react';
import { Tag, Link, Save } from 'lucide-react';
import type { Site } from '../types';
import ColorSwatch from './ColorSwatch';

interface EditSiteModalProps {
  site: Site;
  onSave: (originalUrl: string, newName: string, newUrl: string, newColor?: string) => void;
  onCancel: () => void;
  isPopularSite?: boolean;
}

const EditSiteModal: React.FC<EditSiteModalProps> = ({ site, onSave, onCancel, isPopularSite = false }) => {
  const [name, setName] = useState(site.name);
  const [url, setUrl] = useState(site.url);
  const [color, setColor] = useState(site.customColor);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  const handleSaveClick = () => {
    if (name.trim() && url.trim()) {
      onSave(site.url, name, url, color);
    }
  };
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveClick();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-site-title"
    >
      <div
        className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="edit-site-title" className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">Edit Site</h2>
        <div className="space-y-6">
          <div className="relative">
             <label htmlFor="edit-site-name" className="sr-only">Site Name</label>
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" size={20} />
            <input
              id="edit-site-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Site Name"
              className="appearance-none bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg w-full py-3 pl-12 pr-4 text-slate-900 dark:text-slate-200 leading-tight placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="relative">
            <label htmlFor="edit-site-url" className="sr-only">URL</label>
            <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" size={20} />
            <input
              id="edit-site-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="URL"
              disabled={isPopularSite}
              className="appearance-none bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-lg w-full py-3 pl-12 pr-4 text-slate-900 dark:text-slate-200 leading-tight placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-slate-200/50 dark:disabled:bg-slate-600/50 disabled:cursor-not-allowed disabled:text-slate-400"
            />
          </div>
           {!isPopularSite && (
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
                Card Color
              </label>
              <ColorSwatch selectedColor={color} onChange={setColor} />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onCancel} className="px-5 py-3 rounded-lg text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            disabled={!name.trim() || !url.trim()}
            className="flex items-center justify-center px-5 py-3 rounded-lg text-white font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Save size={16} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSiteModal;