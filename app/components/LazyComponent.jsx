'use client';

import { Suspense, useEffect, useState, useRef } from 'react';

// Loading component that doesn't interfere with animations
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  </div>
);

const LazyComponent = ({
  children,
  fallback = <LoadingSpinner />,
  threshold = 0.1,
  rootMargin = '50px',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure smooth loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={containerRef}>
      {isLoaded ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        <div className="min-h-[50vh] flex items-center justify-center">
          {fallback}
        </div>
      )}
    </div>
  );
};

export default LazyComponent;
