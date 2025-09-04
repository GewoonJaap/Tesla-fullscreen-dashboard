import React from 'react';
import { Pencil, Check } from 'lucide-react';

interface EditModeToggleProps {
  isEditing: boolean;
  onToggle: () => void;
}

const EditModeToggle: React.FC<EditModeToggleProps> = ({ isEditing, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center px-4 py-2 rounded-lg text-white font-semibold text-sm bg-indigo-500/40 border border-indigo-500/60 hover:bg-indigo-500/60 transition-all duration-200"
      aria-live="polite"
      aria-label={isEditing ? 'Finish managing sites' : 'Manage sites'}
    >
      {isEditing ? (
        <>
          <Check size={16} className="mr-2" />
          Done
        </>
      ) : (
        <>
          <Pencil size={16} className="mr-2" />
          Manage Sites
        </>
      )}
    </button>
  );
};

export default EditModeToggle;