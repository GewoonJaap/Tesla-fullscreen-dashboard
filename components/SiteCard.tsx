import React from 'react';
import type { Site } from '../types';
import { X, Pencil, EyeOff } from 'lucide-react';

interface SiteCardProps {
  site: Site;
  onLaunch: (url: string) => void;
  onDelete?: (site: Site) => void;
  onEdit?: (site: Site) => void;
  onHide?: (site: Site) => void;
  isEditMode?: boolean;
  index?: number;
  isBeingDragged?: boolean;
  isDropTarget?: boolean;
  onDragStart?: (index: number) => void;
  onDragOver?: (index: number) => void;
}

const SiteCard: React.FC<SiteCardProps> = ({ 
  site, 
  onLaunch, 
  onDelete, 
  onEdit, 
  onHide, 
  isEditMode = false,
  index,
  isBeingDragged = false,
  isDropTarget = false,
  onDragStart,
  onDragOver,
}) => {
  const style: React.CSSProperties = {};
  if (site.customColor) {
    style.backgroundColor = site.customColor;
  } else if (site.gradient) {
    style.background = site.gradient;
  }
  
  const isDraggable = isEditMode && onDelete && typeof index === 'number';
  
  if (isDraggable && isDropTarget && !isBeingDragged) {
    return (
      <div 
        className="w-full h-28 rounded-2xl bg-indigo-500/10 border-2 border-dashed border-indigo-500"
        data-site-index={index}
      />
    );
  }

  const wrapperClassNames = `
    relative group transition-transform duration-300 ease-in-out
    ${isDraggable ? (isBeingDragged ? 'cursor-grabbing' : 'cursor-grab') : ''}
    ${isBeingDragged ? 'transform scale-105 rotate-2 shadow-2xl z-20' : ''}
  `;

  const buttonClassNames = `
    w-full flex items-center justify-center p-6 rounded-2xl h-28 
    font-bold text-lg md:text-xl text-center shadow-lg hover:shadow-2xl 
    transition-all transform duration-300 ease-in-out
    ${site.color || ''} 
    ${site.textColor} 
    ${!isEditMode ? 'group-hover:scale-105' : ''} 
    ${isBeingDragged ? 'opacity-50' : ''}
    disabled:opacity-70
  `;
  
  return (
    <div 
      className={wrapperClassNames}
      draggable={isDraggable}
      onDragStart={isDraggable && onDragStart ? () => onDragStart(index!) : undefined}
      onDragEnter={isDraggable && onDragOver ? () => onDragOver(index!) : undefined}
      onDragOver={isDraggable ? (e) => e.preventDefault() : undefined}
      onTouchStart={isDraggable && onDragStart ? () => onDragStart(index!) : undefined}
      data-site-index={index}
    >
      <button
        onClick={() => onLaunch(site.url)}
        style={style}
        className={buttonClassNames}
        disabled={isEditMode}
      >
        {site.name}
      </button>
      {(onDelete || onEdit || onHide) && (
        <div 
          className={`absolute -top-2 -right-2 flex items-center space-x-1 transition-opacity duration-300 z-10 ${
            isEditMode ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {onEdit && (
            <button
              onClick={() => onEdit(site)}
              className="bg-slate-700 hover:bg-blue-500 text-white rounded-full p-1.5 transition-colors"
              aria-label={`Edit ${site.name}`}
            >
              <Pencil size={14} />
            </button>
          )}
          {onHide && (
             <button
              onClick={() => onHide(site)}
              className="bg-slate-700 hover:bg-yellow-500 text-white rounded-full p-1.5 transition-colors"
              aria-label={`Hide ${site.name}`}
            >
              <EyeOff size={14} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(site)}
              className="bg-slate-700 hover:bg-red-500 text-white rounded-full p-1.5 transition-colors"
              aria-label={`Delete ${site.name}`}
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SiteCard;