'use client';

import { useEffect } from 'react';

const PreloadManager = () => {
  useEffect(() => {
    // Preload critical components after initial load
    const preloadComponents = () => {
      // Preload Grid component (about section)
      import('./Grid');

      // Preload Projects component after a short delay
      setTimeout(() => {
        import('./Projects');
      }, 1000);

      // Preload Approach component
      setTimeout(() => {
        import('./Approuch');
      }, 2000);

      // Preload Contact component last
      setTimeout(() => {
        import('./Contact');
      }, 3000);
    };

    // Start preloading after initial render
    const timer = setTimeout(preloadComponents, 500);

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
};

export default PreloadManager;
