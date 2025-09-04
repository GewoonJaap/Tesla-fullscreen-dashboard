import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UrlInputForm from './components/UrlInputForm';
import SiteCard from './components/SiteCard';
import Footer from './components/Footer';
import EditSiteModal from './components/EditSiteModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { POPULAR_SITES } from './constants';
import type { Site } from './types';
import { generateGradientFromUrl, getTextColorForBackground } from './utils/color';
import { generateNameFromUrl } from './utils/url';
import { Eye } from 'lucide-react';
import EditModeToggle from './components/EditModeToggle';

const App: React.FC = () => {
  const [customSites, setCustomSites] = useState<Site[]>([]);
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [siteToDelete, setSiteToDelete] = useState<Site | null>(null);
  const [customPopularNames, setCustomPopularNames] = useState<{ [url: string]: string }>({});
  const [hiddenPopularSites, setHiddenPopularSites] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);


  useEffect(() => {
    try {
      const savedSites = localStorage.getItem('customSites');
      if (savedSites) {
        setCustomSites(JSON.parse(savedSites));
      }
      const savedPopularNames = localStorage.getItem('customPopularSiteNames');
      if (savedPopularNames) {
        setCustomPopularNames(JSON.parse(savedPopularNames));
      }
      const savedHiddenSites = localStorage.getItem('hiddenPopularSites');
      if (savedHiddenSites) {
        setHiddenPopularSites(JSON.parse(savedHiddenSites));
      }
    } catch (error) {
      console.error("Failed to load data from local storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('customSites', JSON.stringify(customSites));
    } catch (error) {
      console.error("Failed to save sites to local storage", error);
    }
  }, [customSites]);

  useEffect(() => {
    try {
      localStorage.setItem('customPopularSiteNames', JSON.stringify(customPopularNames));
    } catch (error) {
      console.error("Failed to save popular site names to local storage", error);
    }
  }, [customPopularNames]);

  useEffect(() => {
    try {
      localStorage.setItem('hiddenPopularSites', JSON.stringify(hiddenPopularSites));
    } catch (error) {
      console.error("Failed to save hidden sites to local storage", error);
    }
  }, [hiddenPopularSites]);
  
  useEffect(() => {
    const isDragging = draggedItemIndex !== null;
    document.body.style.cursor = isDragging ? 'grabbing' : '';
    document.body.style.userSelect = isDragging ? 'none' : '';
    document.body.style.webkitUserSelect = isDragging ? 'none' : '';
    document.body.style.touchAction = isDragging ? 'none' : '';

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.touchAction = '';
    };
  }, [draggedItemIndex]);


  const launchUrl = (url: string) => {
    let fullUrl = url.trim();
    if (!/^https?:\/\//i.test(fullUrl)) {
      fullUrl = `https://${fullUrl}`;
    }
    const redirectUrl = `https://www.youtube.com/redirect?q=${encodeURIComponent(fullUrl)}`;
    window.location.href = redirectUrl;
  };

  const saveSite = (name: string, url: string) => {
    const siteName = name.trim() || generateNameFromUrl(url);

    let fullUrl = url.trim();
    if (!/^https?:\/\//i.test(fullUrl)) {
      fullUrl = `https://${fullUrl}`;
    }

    if (customSites.some(site => site.url === fullUrl) || POPULAR_SITES.some(site => site.url === fullUrl)) {
        alert('This URL is already saved.');
        return;
    }

    const { gradient, textColor } = generateGradientFromUrl(fullUrl);
    const newSite: Site = { name: siteName, url: fullUrl, gradient, textColor };
    setCustomSites(prevSites => [...prevSites, newSite]);
  };

  const handleDeleteRequest = (site: Site) => {
    setSiteToDelete(site);
  };

  const confirmDelete = () => {
    if (!siteToDelete) return;
    setCustomSites(prevSites => prevSites.filter(site => site.url !== siteToDelete.url));
    setSiteToDelete(null);
  };

  const cancelDelete = () => {
    setSiteToDelete(null);
  };
  
  const handleEdit = (site: Site) => {
    setEditingSite(site);
  };

  const handleCancelEdit = () => {
    setEditingSite(null);
  };

  const handleUpdateSite = (originalUrl: string, newName: string, newUrl: string, newColor?: string) => {
    const isPopular = POPULAR_SITES.some(site => site.url === originalUrl);

    if (isPopular) {
      setCustomPopularNames(prev => {
        const updatedNames = { ...prev, [originalUrl]: newName.trim() };
        const defaultSite = POPULAR_SITES.find(s => s.url === originalUrl);
        if (defaultSite && defaultSite.name === newName.trim()) {
          delete updatedNames[originalUrl];
        }
        return updatedNames;
      });
    } else {
       let fullUrl = newUrl.trim();
      if (!/^https?:\/\//i.test(fullUrl)) {
          fullUrl = `https://${fullUrl}`;
      }

      const isDuplicate =
          POPULAR_SITES.some(site => site.url === fullUrl) ||
          customSites.some(site => site.url === fullUrl && site.url !== originalUrl);

      if (isDuplicate) {
          alert('This URL is already in use by another site.');
          return;
      }

      setCustomSites(prevSites =>
        prevSites.map(site => {
            if (site.url === originalUrl) {
                const baseUpdate = { 
                  ...site, 
                  name: newName.trim(), 
                  url: fullUrl,
                  color: undefined
                };

                if (newColor) {
                    return {
                        ...baseUpdate,
                        customColor: newColor,
                        textColor: getTextColorForBackground(newColor),
                        gradient: undefined,
                    };
                } else {
                    const { gradient, textColor } = generateGradientFromUrl(fullUrl);
                    return {
                        ...baseUpdate,
                        gradient,
                        textColor,
                        customColor: undefined,
                    };
                }
            }
            return site;
        })
      );
    }
   
    setEditingSite(null);
  };

  const handleHideSite = (siteToHide: Site) => {
    if (POPULAR_SITES.some(s => s.url === siteToHide.url) && !hiddenPopularSites.includes(siteToHide.url)) {
      setHiddenPopularSites(prev => [...prev, siteToHide.url]);
    }
  };

  const handleRestoreSites = () => {
    setHiddenPopularSites([]);
  };

  const toggleEditMode = () => setIsEditMode(prev => !prev);
  
  const displayedPopularSites = POPULAR_SITES
    .filter(site => !hiddenPopularSites.includes(site.url))
    .map(site => ({
      ...site,
      name: customPopularNames[site.url] || site.name
  }));

  const handleDragStart = (index: number) => {
    if (!isEditMode) return;
    setDraggedItemIndex(index);
  };
  
  const handleDragOver = (index: number) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    setDragOverIndex(index);
  };
  
  const handleGridDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isEditMode || draggedItemIndex === null) return;

    const target = e.target as HTMLElement;
    const cardElement = target.closest('[data-site-index]');
    if (!cardElement) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = () => {
    if (draggedItemIndex === null || dragOverIndex === null || draggedItemIndex === dragOverIndex) {
        handleDragEnd();
        return;
    }

    const newSites = [...customSites];
    const [draggedItem] = newSites.splice(draggedItemIndex, 1);
    newSites.splice(dragOverIndex, 0, draggedItem);
    
    setCustomSites(newSites);
    handleDragEnd();
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggedItemIndex === null || !isEditMode) return;

    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

    if (!targetElement) {
        setDragOverIndex(null);
        return;
    };

    const cardElement = targetElement.closest<HTMLElement>('[data-site-index]');
    if (cardElement && cardElement.dataset.siteIndex) {
      const targetIndex = parseInt(cardElement.dataset.siteIndex, 10);
      if (!isNaN(targetIndex)) {
        handleDragOver(targetIndex);
      }
    } else {
      const gridElement = targetElement.closest('.sites-grid');
      if (gridElement) {
          setDragOverIndex(null);
      }
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Header />
        <UrlInputForm onLaunch={launchUrl} onSave={saveSite} />
        
        <div className="mt-12 sm:mt-16 flex justify-end">
          <EditModeToggle isEditing={isEditMode} onToggle={toggleEditMode} />
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-6 sm:mb-8 flex-wrap gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-300 text-center sm:text-left">Popular Sites</h2>
            {hiddenPopularSites.length > 0 && (
              <button
                onClick={handleRestoreSites}
                className="flex items-center text-sm text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                aria-label={`Restore ${hiddenPopularSites.length} hidden popular sites`}
              >
                <Eye size={16} className="mr-1.5" />
                Restore Hidden ({hiddenPopularSites.length})
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {displayedPopularSites.map(site => (
              <SiteCard 
                key={site.url} 
                site={site} 
                onLaunch={launchUrl}
                onEdit={handleEdit}
                onHide={handleHideSite}
                isEditMode={isEditMode}
              />
            ))}
          </div>
        </div>

        {customSites.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-300 mb-6 sm:mb-8 text-center sm:text-left">
              My Sites
            </h2>
            <div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 sites-grid"
              onDrop={handleDrop}
              onDragOver={handleGridDragOver}
              onDragLeave={() => setDragOverIndex(null)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleDrop}
              onTouchCancel={handleDragEnd}
            >
              {customSites.map((site, index) => (
                <SiteCard
                  key={site.url}
                  site={site}
                  index={index}
                  isBeingDragged={draggedItemIndex === index}
                  isDropTarget={dragOverIndex === index}
                  onLaunch={launchUrl}
                  onDelete={handleDeleteRequest}
                  onEdit={handleEdit}
                  isEditMode={isEditMode}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                />
              ))}
            </div>
          </div>
        )}
        
      </main>
      <Footer />
       {editingSite && (
        <EditSiteModal
          site={editingSite}
          onSave={handleUpdateSite}
          onCancel={handleCancelEdit}
          isPopularSite={POPULAR_SITES.some(s => s.url === editingSite.url)}
        />
      )}
      {siteToDelete && (
        <ConfirmDeleteModal
          siteName={siteToDelete.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default App;