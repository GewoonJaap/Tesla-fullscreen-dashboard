import React from 'react';
import { Check, Zap } from 'lucide-react';

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#84cc16', 
  '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', 
  '#8b5cf6', '#d946ef', '#ec4899', '#78716c',
];

interface ColorSwatchProps {
  selectedColor: string | undefined;
  onChange: (color: string | undefined) => void;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ selectedColor, onChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => onChange(undefined)}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 ${
          !selectedColor ? 'ring-2 ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-800 ring-indigo-400' : 'ring-1 ring-slate-400 dark:ring-slate-600'
        }`}
        aria-label="Automatic Color"
        style={{ background: 'conic-gradient(from 180deg at 50% 50%, #ef4444 0deg, #eab308 60deg, #3b82f6 120deg, #8b5cf6 180deg, #ec4899 240deg, #14b8a6 300deg, #ef4444 360deg)'}}
      >
        {!selectedColor && <Zap size={16} className="text-white" />}
      </button>
      {COLORS.map(color => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={`w-9 h-9 rounded-full transition-transform transform hover:scale-110 ${
            selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-800 ring-white' : ''
          }`}
          style={{ backgroundColor: color }}
          aria-label={`Select color ${color}`}
        >
          {selectedColor === color && <Check size={16} className="text-white mix-blend-difference" />}
        </button>
      ))}
    </div>
  );
};

export default ColorSwatch;