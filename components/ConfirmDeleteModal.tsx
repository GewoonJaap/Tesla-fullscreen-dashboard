import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDeleteModalProps {
  siteName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ siteName, onConfirm, onCancel }) => {
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

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
    >
      <div
        className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
            <div className="bg-red-500/10 p-3 rounded-full mb-4">
                <AlertTriangle className="text-red-500" size={32} />
            </div>
            <h2 id="confirm-delete-title" className="text-xl font-bold text-slate-800 dark:text-slate-200">
                Delete Site
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
                Are you sure you want to delete <span className="font-semibold text-slate-700 dark:text-slate-300">{siteName}</span>? This action cannot be undone.
            </p>
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <button onClick={onCancel} className="px-5 py-3 rounded-lg text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors w-full">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full flex items-center justify-center px-5 py-3 rounded-lg text-white font-semibold text-sm bg-red-600 hover:bg-red-700 transition-all duration-200"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;