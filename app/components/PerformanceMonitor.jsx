'use client';

import { useEffect, useRef } from 'react';
import { usePerformance } from '../hooks/usePerformance';

const PerformanceMonitor = () => {
  const observerRef = useRef(null);
  usePerformance();

  useEffect(() => {
    // Track custom metrics
    const trackCustomMetrics = () => {
      // Track time to interactive
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'measure') {
              console.log(`${entry.name}:`, entry.duration);
            }
          });
        });

        observer.observe({ entryTypes: ['measure'] });
      }

      // Track memory usage (if available)
      if ('memory' in performance) {
        const memory = performance.memory;
        console.log('Memory Usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB',
        });
      }
    };

    // Track component render time
    const startTime = performance.now();

    const cleanup = () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      console.log('Component Render Time:', renderTime + 'ms');

      // Send to analytics if needed
      if (process.env.NODE_ENV === 'production') {
        // analytics.track('ComponentRenderTime', { value: renderTime });
      }
    };

    // Cleanup on unmount
    return cleanup;
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
