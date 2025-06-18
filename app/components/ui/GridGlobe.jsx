'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const World = dynamic(() => import('./Globe').then((m) => m.World), {
  ssr: false,
});

const GridGlobe = () => {
  const [webGLAvailable, setWebGLAvailable] = useState(true);
  const [webGLError, setWebGLError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Simple WebGL support check
  useEffect(() => {
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) {
          setWebGLAvailable(false);
          setShowFallback(true);
          return;
        }

        // Simple test
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        setWebGLAvailable(true);
      } catch (error) {
        console.warn('WebGL not supported:', error);
        setWebGLAvailable(false);
        setShowFallback(true);
      }
    };

    checkWebGLSupport();

    // Shorter timeout for faster fallback
    const timeoutId = setTimeout(() => {
      console.warn('WebGL initialization timeout, showing fallback');
      setWebGLAvailable(false);
      setShowFallback(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Error boundary component
  const WebGLErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      const handleError = (error) => {
        if (
          error.message.includes('WebGL') ||
          error.message.includes('THREE') ||
          error.message.includes('Context Lost')
        ) {
          console.warn('WebGL error caught:', error);
          setHasError(true);
          setWebGLError(true);
          setShowFallback(true);
        }
      };

      window.addEventListener('error', handleError);
      return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError || webGLError || showFallback) {
      return <GlobeFallback />;
    }

    return children;
  };

  // Fallback component when WebGL is not available
  const GlobeFallback = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          Interactive Globe
        </h3>
        <p className="text-sm text-gray-400">
          {webGLError
            ? 'WebGL context lost - please refresh'
            : showFallback
            ? 'WebGL not available in your browser'
            : 'Loading...'}
        </p>
        {(webGLError || showFallback) && (
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );

  const globeConfig = {
    pointSize: 2,
    globeColor: '#062056',
    showAtmosphere: true,
    atmosphereColor: '#FFFFFF',
    atmosphereAltitude: 0.1,
    emissive: '#062056',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: 'rgba(255,255,255,0.7)',
    ambientLight: '#38bdf8',
    directionalLeftLight: '#ffffff',
    directionalTopLight: '#ffffff',
    pointLight: '#ffffff',
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 2,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.3,
  };
  const colors = ['#06b6d4', '#3b82f6', '#6366f1'];
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];

  return (
    // remove dark:bg-black bg-white h-screen md:h-auto  w-full flex-row py-20
    // change absolute -left-5 top-36, add w-full h-full md:top-40
    <div className="flex items-center justify-center absolute -left-5 top-36 md:top-40 w-full h-full">
      {/* remove h-full md:h-[40rem] */}
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-96 px-4">
        {/* remove these text divs */}
        {/* <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
            We sell soap worldwide
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
            This globe is interactive and customizable. Have fun with it, and
            don&apos;t forget to share it.
          </p>
        </motion.div> */}
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        {/* remove -bottom-20 */}
        <div
          className="absolute w-full h-72 md:h-full z-10"
          style={{ minHeight: '300px', minWidth: '300px' }}
        >
          {webGLAvailable && !showFallback ? (
            <WebGLErrorBoundary>
              <World data={sampleArcs} globeConfig={globeConfig} />
            </WebGLErrorBoundary>
          ) : (
            <GlobeFallback />
          )}
        </div>
      </div>
    </div>
  );
};
export default GridGlobe;
