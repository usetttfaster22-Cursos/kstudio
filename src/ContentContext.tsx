import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Default images for fallback before backend loads or if keys don't exist
const DEFAULT_CONTENT: Record<string, string> = {
  hero_bg: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
  nosotros_img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop',
  servicios_img_1: 'https://images.unsplash.com/photo-1545083036-b16674bb1a15?q=80&w=800&auto=format&fit=crop',
  servicios_img_2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  servicios_img_3: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
  contacto_img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?q=80&w=1200&auto=format&fit=crop'
};

interface ContentContextType {
  content: Record<string, string>;
  refreshContent: () => Promise<void>;
  updateContent: (key: string, value: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<Record<string, string>>(DEFAULT_CONTENT);

  const refreshContent = async () => {
    try {
      // In production (Docker), the API is served from the same host on /api
      // In dev, you might need to specify localhost:5000/api
      const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/content' : '/api/content';
      
      const res = await fetch(apiUrl);
      if (res.ok) {
        const data = await res.json();
        // Merge fetched data over defaults
        setContent(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Failed to load content', error);
    }
  };

  const updateContent = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    refreshContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, refreshContent, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
