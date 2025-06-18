'use client';
import { useEffect, useRef, useState } from 'react';
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from 'three';
import ThreeGlobe from 'three-globe';
import { useThree, Canvas, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import countries from '../../constants/Globe.json';

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

let numbersOfRings = [0];

export function Globe({ globeConfig, data }) {
  const globeRef = useRef(null);
  const groupRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: '#ffffff',
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: 'rgba(255,255,255,0.7)',
    globeColor: '#1d072e',
    emissive: '#000000',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // Initialize globe only once
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      try {
        // Add a delay to ensure WebGL context is ready
        const initGlobe = () => {
          try {
            if (!globeRef.current && groupRef.current) {
              globeRef.current = new ThreeGlobe();
              groupRef.current.add(globeRef.current);
              setIsInitialized(true);
            }
          } catch (error) {
            console.warn('Failed to initialize ThreeGlobe:', error);
            setIsInitialized(false);
          }
        };

        // Use a longer delay to ensure proper initialization
        setTimeout(initGlobe, 500);
      } catch (error) {
        console.warn('Failed to initialize ThreeGlobe:', error);
        setIsInitialized(false);
      }
    }

    // Cleanup function
    return () => {
      if (globeRef.current && groupRef.current) {
        try {
          groupRef.current.remove(globeRef.current);
          globeRef.current = null;
        } catch (error) {
          console.warn('Error during Globe cleanup:', error);
        }
      }
    };
  }, []);

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    try {
      const globeMaterial = globeRef.current.globeMaterial();
      globeMaterial.color = new Color(globeConfig.globeColor);
      globeMaterial.emissive = new Color(globeConfig.emissive);
      globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
      globeMaterial.shininess = globeConfig.shininess || 0.9;
    } catch (error) {
      console.warn('Error setting globe material:', error);
    }
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    try {
      const arcs = data;
      let points = [];
      for (let i = 0; i < arcs.length; i++) {
        const arc = arcs[i];
        const rgb = hexToRgb(arc.color);
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.startLat,
          lng: arc.startLng,
        });
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.endLat,
          lng: arc.endLng,
        });
      }

      // remove duplicates for same lat and lng
      const filteredPoints = points.filter(
        (v, i, a) =>
          a.findIndex((v2) => ['lat', 'lng'].every((k) => v2[k] === v[k])) === i
      );

      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor(() => defaultProps.polygonColor);

      globeRef.current
        .arcsData(data)
        .arcStartLat((d) => d.startLat * 1)
        .arcStartLng((d) => d.startLng * 1)
        .arcEndLat((d) => d.endLat * 1)
        .arcEndLng((d) => d.endLng * 1)
        .arcColor((e) => e.color)
        .arcAltitude((e) => e.arcAlt * 1)
        .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
        .arcDashLength(defaultProps.arcLength)
        .arcDashInitialGap((e) => e.order * 1)
        .arcDashGap(15)
        .arcDashAnimateTime(() => defaultProps.arcTime);

      globeRef.current
        .pointsData(filteredPoints)
        .pointColor((e) => e.color)
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(2);

      globeRef.current
        .ringsData([])
        .ringColor(() => defaultProps.polygonColor)
        .ringMaxRadius(defaultProps.maxRings)
        .ringPropagationSpeed(RING_PROPAGATION_SPEED)
        .ringRepeatPeriod(
          (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
        );
    } catch (error) {
      console.warn('Error building globe data:', error);
    }
  }, [
    isInitialized,
    data,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      try {
        const newNumbersOfRings = genRandomNumbers(
          0,
          data.length,
          Math.floor((data.length * 4) / 5)
        );

        const ringsData = data
          .filter((d, i) => newNumbersOfRings.includes(i))
          .map((d) => ({
            lat: d.startLat,
            lng: d.startLng,
            color: d.color,
          }));

        globeRef.current.ringsData(ringsData);
      } catch (error) {
        console.warn('Error updating rings:', error);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    if (!gl || !size) return;

    try {
      // Only do basic setup to prevent errors
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      gl.setSize(size.width, size.height);
      gl.setClearColor(0x000000, 0);
    } catch (error) {
      console.warn('WebGL renderer config error:', error);
    }
  }, [gl, size]);

  return null;
}

export function World(props) {
  const { globeConfig } = props;
  const [webGLError, setWebGLError] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [contextLost, setContextLost] = useState(false);
  const canvasRef = useRef(null);

  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  // Handle canvas sizing to prevent viewport issues
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        if (container) {
          const rect = container.getBoundingClientRect();
          const width = Math.max(rect.width, 300);
          const height = Math.max(rect.height, 300);

          // Set canvas size
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
        }
      }
    };

    // Initial size update
    updateCanvasSize();

    // Update on resize
    const handleResize = () => {
      requestAnimationFrame(updateCanvasSize);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle context loss
  useEffect(() => {
    const handleContextLost = () => {
      console.warn('WebGL context lost');
      setContextLost(true);
      setWebGLError(true);
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      return () =>
        canvas.removeEventListener(
          'webglcontextlost',
          handleContextLost,
          false
        );
    }
  }, []);

  // Fallback component for WebGL errors
  const WebGLFallback = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
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
        <h3 className="text-sm font-semibold text-gray-200 mb-1">
          Interactive Globe
        </h3>
        <p className="text-xs text-gray-400">
          {contextLost
            ? 'WebGL context lost'
            : isInitializing
            ? 'Loading...'
            : 'WebGL not available'}
        </p>
        {contextLost && (
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );

  if (webGLError || contextLost) {
    return <WebGLFallback />;
  }

  return (
    <Canvas
      ref={canvasRef}
      scene={scene}
      camera={new PerspectiveCamera(50, aspect, 180, 1800)}
      onError={(error) => {
        console.warn('WebGL error:', error);
        setWebGLError(true);
      }}
      onCreated={() => {
        setIsInitializing(false);
      }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false,
        stencil: false,
        depth: true,
      }}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min, max, count) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
