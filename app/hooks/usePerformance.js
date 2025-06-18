'use client';

import { useEffect, useRef } from 'react';

export const usePerformance = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Track Largest Contentful Paint (LCP)
      observerRef.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];

        if (lastEntry) {
          console.log('LCP:', lastEntry.startTime);
          // Send to analytics service
          // analytics.track('LCP', { value: lastEntry.startTime });
        }
      });

      observerRef.current.observe({ entryTypes: ['largest-contentful-paint'] });

      // Track First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
          // Send to analytics service
          // analytics.track('FID', { value: entry.processingStart - entry.startTime });
        });
      });

      fidObserver.observe({ entryTypes: ['first-input'] });

      // Track Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();

        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        console.log('CLS:', clsValue);
        // Send to analytics service
        // analytics.track('CLS', { value: clsValue });
      });

      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Track page load time
    const trackPageLoad = () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        console.log('Page Load Time:', loadTime);
        // Send to analytics service
        // analytics.track('PageLoadTime', { value: loadTime });
      }
    };

    if (document.readyState === 'complete') {
      trackPageLoad();
    } else {
      window.addEventListener('load', trackPageLoad);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('load', trackPageLoad);
    };
  }, []);
};

export const useIntersectionObserver = (callback, options = {}) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [callback, options]);

  return targetRef;
};
